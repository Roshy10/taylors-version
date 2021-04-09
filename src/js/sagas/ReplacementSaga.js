import {buffers} from "@redux-saga/core";
import {chunk, find, reverse, sortBy, uniq} from "lodash";
import {actionChannel, all, call, delay, put, race, take, takeEvery} from "redux-saga/effects";
import spotify from "../../mappings/spotify";
import {showSnackbar} from "../actions/NotificationActions";
import {getPlaylists, purgePlaylists} from "../actions/PlaylistActions";
import {deleteTracks, insertTrack, replacementFailure} from "../actions/ReplacementActions";
import {makeRequest} from "./HttpSaga";

function* dispatchPlaylistReplacement(playlist) {

    const putFailure = () => put(replacementFailure());

    // get our tracks in descending order or index
    // this will prevent errors when inserting tracks by index
    const tracks = reverse(sortBy(playlist.tracks, "index"));

    let error = false;

    // insert tracks 1 at a time, waiting for one request to return before sending the next
    for (let track of tracks) {
        const action = insertTrack(playlist.id, track.replacement, track.index);

        const result = yield call(makeRequest, action);

        if (result !== true) {
            error = true;
            break;
        }
    }

    if (error) {
        yield putFailure();
    } else {
        const tracksToRemove = uniq(tracks.flatMap((track) => {
            const replacementObject = find(spotify, ["replacement", track.replacement]);
            return replacementObject ? replacementObject.originals : [];
        }));
        const chunkedTracks = chunk(tracksToRemove, 100);

        // delete all required tracks and wait until they're all done before returning
        const result = yield all(
            chunkedTracks
                .map((tracks) => call(
                    makeRequest,
                    deleteTracks(playlist.id, tracks),
                )),
        );

        if (result.some((element) => element !== true)) {
            yield putFailure();
        }
    }
}

function* dispatchReplacements(action) {
    // FIXME I'm certain there must be a better way to deal with request errors
    //  please raise an issue or PR if you know how to make it suck less
    //  https://github.com/Roshy10/taylors-version/issues/5

    // start listening for failure actions
    const requestChan = yield actionChannel(replacementFailure().type, buffers.dropping(1));

    // run parallel requests, 1 for each playlist
    yield all(action.payload.map((playlist) => call(dispatchPlaylistReplacement, playlist)));

    // see if any failures happened during the run
    const {success} = yield race({
        success: delay(250),
        error: take(requestChan),
    });

    // empty out the playlists we have saved from the store
    yield put(purgePlaylists());

    // re-fetch the latest state of the user's playlists
    yield put(getPlaylists());

    if (success) {
        process.env.NODE_ENV !== "production" && console.log("playlist updating complete");
        yield put(showSnackbar("success", "notifications.replacement.success"));
    } else {
        process.env.NODE_ENV !== "production" && console.log("playlist updating completed with errors");
        yield put(showSnackbar("warning", "notifications.replacement.failure"));
    }

}

function* ReplacementSaga() {
    yield takeEvery("REPLACEMENT/ALL", dispatchReplacements);
}

export default ReplacementSaga;