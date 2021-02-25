import {Box, CircularProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment, lazy, Suspense} from "react";
import {useTranslation} from "react-i18next";

// Lazy-load large, visually insignificant elements
const SpotifyTokenButton = lazy(() => import("./SpotifyTokenButton"));
const Footer = lazy(() => import("./Footer"));

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
    buttonLoader: {
        color: theme.palette.common.white,
    },
    message: {
        color: theme.palette.common.white,
        //marginTop: theme.spacing(3),
        textAlign: "center",
        maxWidth: "90%",
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
                    <Suspense fallback={<CircularProgress className={classes.buttonLoader}/>}>
                        <SpotifyTokenButton
                            className={classes.button}
                        />
                    </Suspense>
                    <Typography className={classes.message}>
                        {t("landing.message")}
                        <br/>
                        <br/>
                        {t("landing.messageTwo")}
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.footer}>
                <Suspense fallback={<CircularProgress className={classes.buttonLoader}/>}>
                    <Footer/>
                </Suspense>
            </Box>
        </Fragment>
    );
};

export default LandingPage;