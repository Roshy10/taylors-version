import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import config from "config";
import {isEmpty} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import useStickyState from "../hooks/useStickyState";
import SpotifyIcon from "../icons/SpotifyIcon";

const clientId = config.clientId;
const permissionScopes = [
    // see the items in a user's playlist, and update them
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    // see a users saved songs/albums, and update them
    "user-library-modify",
    "user-library-read",
];
const baseAuthURL = "https://accounts.spotify.com/authorize";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
    },
}));

export const SpotifyTokenButton = ({className, ...otherProps}) => {
    const {t} = useTranslation();
    const [state, setState] = useStickyState("spotifyState");
    const classes = useStyles();

    const authUrl = useMemo(() => {
        const url = new URL(baseAuthURL);
        const authorizeParams = url.searchParams;
        authorizeParams.append("client_id", clientId);
        authorizeParams.append("response_type", "token");
        authorizeParams.append("redirect_uri", `${config.appUrl}/spotify`);
        authorizeParams.append("state", state);
        authorizeParams.append("scope", permissionScopes.join(" "));
        return url.toString();
    }, [state]);

    useEffect(() => {
        if (isEmpty(state)) {
            setState(uuidv4());
        }
    }, []);

    return (
        <Button
            className={clsx(classes.button, className)}
            href={authUrl}
            startIcon={<SpotifyIcon/>}
            variant="contained"
            {...otherProps}
        >
            {t("authorize.startButton")}
        </Button>
    );
};

SpotifyTokenButton.propTypes = {
    className: PropTypes.string,
};

export default SpotifyTokenButton;