import {put, takeLatest} from "redux-saga/effects";
import {saveUser} from "../actions/AuthActions";
import {get} from "../actions/HttpActions";

function* getUserDetails() {
    yield put(get("/me", {}, saveUser));
}

function* AuthSaga() {
    yield takeLatest("AUTH/SAVE", getUserDetails);
}

export default AuthSaga;