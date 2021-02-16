import {Button} from "@material-ui/core";
import config from "config";
import {isEmpty} from "lodash";
import React, {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import useStickyState from "../../hooks/useStickyState";

const clientId = "1b5718d03b174bfb8988f14bfac422a6";
const permissionScopes = [
    // see the items in a user's playlist, and update them
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    // see a users saved songs/albums, and update them
    "user-library-modify",
    "user-library-read",
];
const uuid = uuidv4();
const baseAuthURL = "https://accounts.spotify.com/authorize";

export const SpotifyTokenButton = () => {
    const {t} = useTranslation();
    const [state, setState] = useStickyState("spotifyState");

    const authUrl = useMemo(() => {
        const url = new URL(baseAuthURL);
        const authorizeParams = url.searchParams;
        authorizeParams.append("client_id", clientId);
        authorizeParams.append("response_type", "token");
        authorizeParams.append("redirect_uri", config.appUrl);
        authorizeParams.append("state", state);
        authorizeParams.append("scope", permissionScopes.join(" "));
        return url.toString();
    }, [state]);

    useEffect(() => {
        if (isEmpty(state)) {
            setState(uuid);
        }
    }, []);

    return (
        <Button href={authUrl}>
            {t("authorize.startButton")}
        </Button>
    );
};

export default SpotifyTokenButton;