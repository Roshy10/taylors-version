export const get = (url, params, onSuccessAction, includeIndex = false) => ({
    type: "HTTP/REQUEST",
    payload: {
        method: "get",
        url,
        params,
    },
    onSuccessAction,
    includeIndex,
});

export const sent = ({
    type: "HTTP/SENT",
});

export const received = ({
    type: "HTTP/RECEIVED",
});