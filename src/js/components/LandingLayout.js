import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import Footer from "./Footer";
import Notifications from "./Notifications";
import PushPrompt from "./push/PushPrompt";
import SpotifyTokenButton from "./SpotifyTokenButton";

const mobileCutoff = 470;

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            fontSize: "4rem",
        },
        maxWidth: "90%",
    },
    centerOuterContainer: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    centerInnerContainer: {
        textAlign: "center",
        height: "50%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        [theme.breakpoints.down(mobileCutoff)]: {
            height: "60%",
        },
    },
    button: {
        [theme.breakpoints.down("xs")]: {
            width: "80%",
        },
    },
    messageContainer: {
        color: theme.palette.common.white,
        textAlign: "center",
        maxWidth: "90%",
    },
    message: {
        margin: theme.spacing(2, 0),
    },
    latestUpdateContainer: {
        color: theme.palette.common.white,
        textAlign: "center",
    },
    notificationIcon: {
        [theme.breakpoints.up(mobileCutoff)]: {
            display: "none",
        },
    },
    latestUpdateAlbum: {
        fontWeight: 600,
        marginBottom: theme.spacing(1),
    },
}));

export const LandingLayout = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Fragment>
            <Box className={classes.centerOuterContainer}>
                <Box className={classes.centerInnerContainer}>
                    <Typography
                        className={classes.title}
                        variant="h1"
                    >
                        {t("appName")}
                    </Typography>
                    <SpotifyTokenButton className={classes.button}/>
                    <Box className={classes.messageContainer}>
                        <Typography className={classes.message}>{t("landing.message")}</Typography>
                        <Typography className={classes.message}>{t("landing.messageTwo")}</Typography>
                    </Box>
                </Box>
                <Box className={classes.latestUpdateContainer}>
                    <Typography>{t("landing.latestMessage")}</Typography>
                    <Typography className={classes.latestUpdateAlbum}>{t("landing.latestAlbum")}</Typography>
                    <PushPrompt/>
                </Box>
            </Box>
            <Footer/>
            <Notifications/>
        </Fragment>
    );
};

export default LandingLayout;