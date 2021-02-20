export const showSnackbar = (severity, message) => ({
    type: "NOTIFICATION/SHOW_SNACK",
    payload: {
        severity,
        message,
    },
});
export const hideSnackbar = () => ({
    type: "NOTIFICATION/HIDE_SNACK",
});