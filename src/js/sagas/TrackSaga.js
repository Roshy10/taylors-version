import {chunk, includes, isArray, uniq} from "lodash";
import {all, put, select, takeEvery} from "redux-saga/effects";
import {getTrackDetails as getTrackDetailsAction} from "../actions/TrackActions";
import {uriToId} from "../util/spotify";

function* getTrackDetails(action) {

    if (isArray(action.payload) && action.payload.length > 0) {
        let existingTracks = yield select((state => state.TrackReducer.tracks));

        const ids = uniq(action.payload)
            .filter((uri) => !includes(existingTracks, uri))
            .map(uriToId);
        // 50 is the max number of tracks you can request in one call
        const chunkedIds = chunk(ids, 50)
            .map((chunk) => chunk.join(","));

        // send out one request for each chunk of 50
        let effects = chunkedIds.map((ids) => put(getTrackDetailsAction(ids)));
        yield all(effects);
    }
}

function* TrackSaga() {
    yield takeEvery("TRACKS/REQUEST", getTrackDetails);
}

export default TrackSaga;