import {buffers} from "@redux-saga/core";
import {chunk, reverse, sortBy, uniq} from "lodash";
import {actionChannel, all, call, delay, put, race, take, takeEvery} from "redux-saga/effects";
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
        const tracksToRemove = uniq(tracks.map((track) => track.uri));
        const chunkedTracks = chunk(tracksToRemove, 100);

        console.debug(`deleting from playlist: ${playlist.name}`);
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

    // FIXME this it doesn't catch errors from the final delete step

    // start listening for failure actions
    const requestChan = yield actionChannel(replacementFailure().type, buffers.dropping(1));

    // run parallel requests, 1 for each playlist
    yield all(action.payload.map((playlist) => call(dispatchPlaylistReplacement, playlist)));

    // see if any failures happened during the run
    const {success} = yield race({
        success: delay(250),
        error: take(requestChan),
    });

    if (success) {
        // TODO dispatch a "complete" action here
        console.log("playlist updating complete");
    } else {
        // TODO dispatch a "failure" action here
        console.log("playlist updating completed with errors");
    }

}

function* ReplacementSaga() {
    yield takeEvery("REPLACEMENT/ALL", dispatchReplacements);
}

export default ReplacementSaga;