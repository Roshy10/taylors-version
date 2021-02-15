import {put, takeLatest} from "redux-saga/effects";
import {get} from "../actions/HttpActions";

function* getPlaylists(action) {
    yield put(get(action.payload.url, action.payload.limit, action.onSuccessAction));
}

function* playlistSaga() {
    yield takeLatest("PLAYLIST/COLLECT", getPlaylists);
}

export default playlistSaga;