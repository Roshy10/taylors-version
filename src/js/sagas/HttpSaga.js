import axios from "axios";
import retry from "axios-retry-after";
import {assign, isEmpty} from "lodash";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {received, sent} from "../actions/HttpActions";
import {showSnackbar} from "../actions/NotificationActions";

const client = axios.create({
    baseURL: "https://api.spotify.com/v1",
});
// automatically retry 429s
client.interceptors.response.use(null, retry(client));

const requestData = (token, {method, url, params, data}) => {
    let config = {
        method,
        url,
        params,
        headers: {
            "Authorization": "Bearer " + token,
        },
    };

    if (!isEmpty(data)) {
        config.data = JSON.stringify(data);
        config.headers["Content-Type"] = "application/json";
    }

    return client.request(config);
};

export function* makeRequest(action) {
    let token = yield select((state => state.AuthReducer.token));
    if (token) {
        // log that we have a request in-flight
        yield put(sent);
        try {
            const {data} = yield call(requestData, token, action.payload);

            // log that we have once less request in-flight
            yield put(received);

            if (data.next) {
                // inject the pagination url and dispatch a new request to continue getting the rest of the playlists
                // hopefully people don't have too many or this may take a while and choke up the browser
                const newAction = assign({}, action, {payload: {url: data.next}});
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

            return true;

        } catch (error) {
            yield put(received);
            // catch errors from the api call
            yield put(showSnackbar("error", error));
        }

    } else {
        yield put(showSnackbar("error", "notifications.http.noAuthToken"));
    }
}

function* HttpSaga() {
    yield takeEvery("HTTP/REQUEST", makeRequest);
}

export default HttpSaga;