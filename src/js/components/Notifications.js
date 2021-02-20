import {Snackbar} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {hideSnackbar} from "../actions/NotificationActions";

const Notifications = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const notification = useSelector(state => state.NotificationReducer.snackbar);
    const handleClose = () => dispatch(hideSnackbar());

    return (
        <Snackbar
            autoHideDuration={6000}
            onClose={handleClose}
            open={notification.display}
        >
            <Alert onClose={handleClose} severity={notification.severity}>
                <AlertTitle>{t(`notifications.levels.${notification.severity}`)}</AlertTitle>
                {t(notification.message)}
            </Alert>
        </Snackbar>
    );
};

export default Notifications;