import {Box, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
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
    footerItem: {
        color: theme.palette.common.white,
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
                    <SpotifyTokenButton
                        className={classes.button}
                    />
                    <Typography className={classes.message}>
                        {t("landing.message")}
                        <br/>
                        <br/>
                        {t("landing.messageTwo")}
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.footer}>
                <Link href="https://raw.githubusercontent.com/Roshy10/taylors-version/master/LICENSE">
                    <Typography className={classes.footerItem}>{t("landing.legal")}</Typography>
                </Link>
                <Link href="https://github.com/Roshy10/taylors-version">
                    <Typography className={classes.footerItem}>{t("landing.github")}</Typography>
                </Link>
                <Link href="https://ko-fi.com/roshy10">
                    <Typography className={classes.footerItem}>{t("landing.donate")}</Typography>
                </Link>
            </Box>
        </Fragment>
    );
};

export default LandingPage;