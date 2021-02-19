import {put, takeLatest} from "redux-saga/effects";
import {saveUser} from "../actions/AuthActions";
import {getRequest} from "../actions/HttpActions";

function* getUserDetails() {
    yield put(getRequest("/me", {}, saveUser));
}

function* AuthSaga() {
    yield takeLatest("AUTH/SAVE", getUserDetails);
}

export default AuthSaga;