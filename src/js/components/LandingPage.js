import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import Footer from "./Footer";
import SpotifyTokenButton from "./SpotifyTokenButton";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        [theme.breakpoints.down("sm")]: {
            fontSize: "4rem",
        },
        maxWidth: "90%",
    },
    centerOuterContainer: {
        height: "100%",
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
        [theme.breakpoints.down(470)]: {
            height: "90%",
        },
    },
    button: {
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
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
    footer: {
        position: "absolute",
        bottom: theme.spacing(2),
        color: theme.palette.common.white,
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            bottom: theme.spacing(1),
        },
    },
    latestUpdateContainer: {
        color: theme.palette.common.white,
        textAlign: "center",
        [theme.breakpoints.down(470)]: {
            display: "none",
        },
    },
    latestUpdateAlbum: {
        fontWeight: 600,
    },
}));

export const LandingPage = () => {
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
                </Box>
            </Box>
            <Box className={classes.footer}>
                <Footer/>
            </Box>
        </Fragment>
    );
};

export default LandingPage;