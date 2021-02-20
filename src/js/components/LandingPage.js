import {Box, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {isEmpty} from "lodash";
import queryString from "query-string";
import React, {Fragment, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {storeToken} from "../actions/AuthActions";
import useAuthToken from "../hooks/useAuthToken";
import useStickyState from "../hooks/useStickyState";
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
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state] = useStickyState("spotifyState");
    const token = useAuthToken();

    // detect incoming token
    const params = useLocation();
    const responseSearch = params && params.search && queryString.parse(params.search);
    const responseHash = params && params.hash && queryString.parse(params.hash);
    const accessToken = responseHash && responseHash.access_token;

    const tokenNeeded = !token || (accessToken && state !== responseHash.state);

    const nextStep = () => history.push("/setup");

    // check the response was good
    if (accessToken && state !== responseHash.state) {
        // returned token didn't match the token we have saved, likely the original API request didn't originate from this site
        // TODO show this as an error to the user
        console.error("Spotify state token mismatch");
    } else if (!isEmpty(responseSearch.error)) {
        // there was an error in the OAuth flow, the user probably declined the permissions
        // TODO show this as an error to the user
        console.info("User declined permissions");
    }

    useEffect(() => {
        // save incoming token with expiration time
        if (accessToken !== token && !isEmpty(accessToken)) {
            // a new token has just been received
            dispatch(storeToken(accessToken, Date.now() + (responseHash.expires_in * 1000)));
            //redirect the user to the next page
            nextStep();
        }
    }, [accessToken]);

    return (
        <Fragment>
            <Box className={classes.buttonContainer}>
                {tokenNeeded
                    ? <SpotifyTokenButton className={classes.button}/>
                    : <Button className={classes.button} onClick={nextStep}>{t("landing.start")}</Button>}
            </Box>
        </Fragment>
    );
};

export default LandingPage;