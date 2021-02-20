import {assign, merge} from "lodash";

const NotificationReducer = (state = {snackbar: {}}, action) => {
    switch (action.type) {

        case "NOTIFICATION/SHOW_SNACK":
            return assign({}, state, {
                snackbar: {
                    display: true,
                    message: action.payload.message,
                    severity: action.payload.severity,
                },
            });

        case "NOTIFICATION/HIDE_SNACK":
            return merge({}, state, {
                snackbar: {
                    display: false,
                },
            });

        default:
            return state;
    }
};

export default NotificationReducer;