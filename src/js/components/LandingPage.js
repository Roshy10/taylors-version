import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import SpotifyTokenButton from "./SpotifyTokenButton";

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
}));

export const LandingPage = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Fragment>
            <Box className={classes.buttonContainer}>
                <SpotifyTokenButton className={classes.button}/>
            </Box>
        </Fragment>
    );
};

export default LandingPage;