import axios from "axios";
import {assign} from "lodash";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {expireToken} from "../actions/AuthActions";

const baseUrl = "https://api.spotify.com/v1";

const requestData = (token, {method, url, params, fullUrl}, limit = null) => axios({
    method,
    url: fullUrl || (baseUrl + url),
    params: (limit && !fullUrl )? assign(params, {limit}) : params,
    headers: {
        "Authorization": "Bearer " + token,
    },
});

function* makeRequest(action) {
    let token = yield select((state => state.AuthReducer.token));
    const {data, status, statusText} = yield call(requestData, token, action.payload, action.limit);
    if (status === 200) {
        const content = (data && data.items) || data;

        if(data.next) {
            // inject the pagination url and dispatch a new request to continue getting the rest of the playlists
            // hopefully people don't have too many or this may take a while and choke up the browser
            const newAction = assign({}, action, {payload: {fullUrl: data.next}});
            yield put(newAction);
        }

        if (action.onSuccessAction) {
            yield put(action.onSuccessAction(content));
        }

    } else if (status === 401 || status === 403) {
        // request was declined due to permissions, invalidate the token and force the user to get a new one
        yield put(expireToken);
    } else {
        yield put({type: "USER_FETCH_FAILED", message: statusText});
    }

}

function* httpSaga() {
    yield takeEvery("HTTP/REQUEST", makeRequest);
}

export default httpSaga;