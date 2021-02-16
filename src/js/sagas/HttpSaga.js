import axios from "axios";
import {assign} from "lodash";
import {call, delay, put, select, takeEvery} from "redux-saga/effects";
import {expireToken} from "../actions/AuthActions";
import {received, sent} from "../actions/HttpActions";

const baseUrl = "https://api.spotify.com/v1";

const requestData = (token, {method, url, params, fullUrl}) => axios({
    method,
    url: fullUrl || (baseUrl + url),
    params,
    headers: {
        "Authorization": "Bearer " + token,
    },
});

function* makeRequest(action) {
    let token = yield select((state => state.AuthReducer.token));
    if (token) {
        // log that we have a request in-flight
        yield put(sent);
        const {data, headers, status, statusText} = yield call(requestData, token, action.payload);

        if (status === 200) {
            if (data.next) {
                // inject the pagination url and dispatch a new request to continue getting the rest of the playlists
                // hopefully people don't have too many or this may take a while and choke up the browser
                const newAction = assign({}, action, {payload: {fullUrl: data.next}});
                yield put(newAction);
            }

            if (action.onSuccessAction) {
                let content = (data && data.items) || data;

                if (action.includeIndex) {
                    // add the absolute index of the item, accounting for pagination
                    content = content.map((item, index) => ({
                        ...item,
                        index: data.offset + index,
                    }));
                }

                yield put(action.onSuccessAction(content, action));
            }

        } else if (status === 429) {
            // request was declined due to rate limit being exceeded
            yield delay(headers["retry-after"] * 1000);
            yield put(action);
        } else if (status === 401 || status === 403) {
            // request was declined due to permissions, invalidate the token and force the user to get a new one
            yield put(expireToken());
        } else {
            yield put({type: "HTTP_REQUEST_FAILED", message: statusText});
        }

        // log that we have once less request in-flight
        yield put(received);
    } else {
        yield put({type: "HTTP_REQUEST_FAILED", message: "no Auth Token"});
    }
}

function* HttpSaga() {
    yield takeEvery("HTTP/REQUEST", makeRequest);
}

export default HttpSaga;