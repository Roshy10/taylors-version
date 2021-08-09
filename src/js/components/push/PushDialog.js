import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import useWebPush from "../../hooks/useWebPush";

const PushDialog = ({open, onClose}) => {
    const [translate] = useTranslation();
    const {isSubscribed, subscribe, unsubscribe} = useWebPush();
    const handleClick = () => {
        if (isSubscribed) {
            unsubscribe().finally(() => {
                onClose();
            });
        } else {
            subscribe().finally(() => {
                onClose();
            });
        }
    };

    const translateOptions = isSubscribed ? {context: "unsubscribe"} : undefined;

    return (
        <Dialog open={open}>
            <DialogTitle>{translate("pushNotifications.dialog.title", translateOptions)}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Trans i18nKey="pushNotifications.dialog.message" tOptions={translateOptions}>
                        <br/>
                    </Trans>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    {translate("pushNotifications.dialog.deny", translateOptions)}
                </Button>
                <Button autoFocus color="primary" onClick={handleClick}>
                    {translate("pushNotifications.dialog.confirm", translateOptions)}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PushDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default PushDialog;