export const getRequest = (url, params, onSuccessAction, includeIndex = false) => ({
    type: "HTTP/REQUEST",
    payload: {
        method: "get",
        url,
        params,
    },
    onSuccessAction,
    includeIndex,
});

export const postRequest = (url, params) => ({
    type: "HTTP/REQUEST",
    payload: {
        method: "post",
        url,
        params,
    },
});

export const deleteRequest = (url, data) => ({
    type: "HTTP/REQUEST",
    payload: {
        method: "delete",
        url,
        data,
    },
});

export const sent = ({
    type: "HTTP/SENT",
});

export const received = ({
    type: "HTTP/RECEIVED",
});

export const resetStats = ({
    type: "HTTP/RESET_TOTAL",
});