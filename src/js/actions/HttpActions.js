
export const get = (url, limit, onSuccessAction) => ({
    type: "HTTP/REQUEST",
    limit,
    payload: {
        method: "get",
        url,
    },
    onSuccessAction
});