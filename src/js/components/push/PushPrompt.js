import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Notifications, NotificationsActive} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import useWebPush from "../../hooks/useWebPush";
import PushDialog from "./PushDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        position: "absolute",
        textAlign: "center",
        width: "100vw",
    },
    button: {
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
    },
}));

// TODO consider adding alongside "Taylorized" message
const PushPrompt = ({className, lightTheme}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {canUsePush, isSubscribed} = useWebPush();
    const classes = useStyles();
    const [translate] = useTranslation();

    const handleOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    
    return canUsePush ? (
        <span className={className}>
            <Button
                className={lightTheme ? undefined : classes.button}
                color={lightTheme ? "primary" : undefined}
                onClick={handleOpen}
                startIcon={isSubscribed ? <NotificationsActive/> : <Notifications/>}
                variant="outlined"
            >
                {translate("pushNotifications.prompt", isSubscribed ? {context: "unsubscribe"} : undefined)}
            </Button>
            <PushDialog onClose={handleClose} open={dialogOpen}/>
        </span>
    ) : null;
};

PushPrompt.propTypes = {
    className: PropTypes.string,
    lightTheme: PropTypes.bool,
};

export default PushPrompt;