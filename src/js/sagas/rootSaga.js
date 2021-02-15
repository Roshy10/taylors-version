import { all, fork } from "redux-saga/effects";
import playlistSaga from "./PlaylistSaga";
import httpSaga from "./HttpSaga";

export default function* () {
    yield all([
        fork(playlistSaga),
        fork(httpSaga)
    ]);
}