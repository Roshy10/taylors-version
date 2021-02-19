import {all, fork} from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import HttpSaga from "./HttpSaga";
import PlaylistSaga from "./PlaylistSaga";
import ReplacementSaga from "./ReplacementSaga";
import TrackSaga from "./TrackSaga";

export default function* () {
    yield all([
        fork(AuthSaga),
        fork(HttpSaga),
        fork(PlaylistSaga),
        fork(ReplacementSaga),
        fork(TrackSaga),
    ]);
}