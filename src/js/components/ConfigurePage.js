import {Backdrop, CircularProgress, FormControlLabel, FormGroup, Switch, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {concat, includes, isArray, without} from "lodash";
import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAllTracksForPlaylists, getPlaylists} from "../actions/PlaylistActions";
import useAuthToken from "../hooks/useAuthToken";
import PlaylistList from "./PlaylistList";

const useStyles = makeStyles((theme) => ({
    formGroup: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    listTitle: {
        fontSize: "2rem",
    },
    backdrop: {
        zIndex: theme.zIndex.tooltip + 1,
        color: "#fff",
    },
}));

export const ConfigurePage = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const token = useAuthToken();
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.PlaylistReducer.playlists);
    const userId = useSelector(state => state.AuthReducer.id);
    const loading = useSelector(state => state.HttpReducer.inFlight) > 0;
    const [includePublic, setIncludePublic] = useState(true);
    const [includeCollab, setIncludeCollab] = useState(true);
    const [includeOthers, setIncludeOthers] = useState(false);
    const [excludedPlaylists, setExcludedPlaylists] = useState([]);

    useEffect(() => {
        // make request for all of the user's playlists
        dispatch(getPlaylists());
    }, []);

    // filter them according to the provided props
    const filteredPlaylists = playlists.filter((playlist) => {
        if (!includePublic && playlist.public) {
            return false;
        }

        if (includeOthers) {
            // include all playlists the user can write
            return playlist.owner.id === userId || playlist.collaborative;
        }

        if (!includeCollab && playlist.collaborative) {
            // filter out the collaborative ones
            return false;
        }

        return playlist.owner.id === userId;
    });

    useEffect(() => {
        // request all tracks for the playlists that passed the filter
        dispatch(getAllTracksForPlaylists(filteredPlaylists.map((playlist) => playlist.id)));
    }, [filteredPlaylists]);

    // now we have tracks, filter the playlists to only include those which have tracks
    // the reducer should have dropped any tracks we don't care about as the api responses came in
    const swappablePlaylists = filteredPlaylists.filter((playlist) => isArray(playlist.tracks) && playlist.tracks.length > 0);

    if (!token) {
        // token isn't valid, back to home screen
        return <Redirect to="/"/>;
    }

    const toggleExcludedPlaylist = (playlistId) => {
        setExcludedPlaylists(prevState => includes(excludedPlaylists, playlistId)
            ? without(prevState, playlistId)
            : concat(prevState, playlistId),
        );
    };

    return (
        <Fragment>
            <FormGroup row className={classes.formGroup}>
                <FormControlLabel
                    control={<Switch
                        checked={includePublic}
                        onChange={() => setIncludePublic((val) => !val)}
                    />}
                    label={t("process.configure.includePublic")}
                />
                <FormControlLabel
                    control={<Switch
                        checked={includeCollab}
                        onChange={() => setIncludeCollab((val) => {
                            const newVal = !val;
                            if (!newVal) {
                                setIncludeOthers(false);
                            }
                            return newVal;
                        })}
                    />}
                    label={t("process.configure.includeCollaborative")}
                />
                <FormControlLabel
                    control={<Switch
                        checked={includeOthers}
                        disabled={!includeCollab}
                        onChange={() => setIncludeOthers((val) => !val)}
                    />}
                    label={t("process.configure.includeOthers")}
                />
            </FormGroup>
            <Typography variant="h2">
                {t("process.configure.listTitle")}
            </Typography>
            <PlaylistList
                data={swappablePlaylists}
                excludedPlaylists={excludedPlaylists}
                toggleExcludedPlaylist={toggleExcludedPlaylist}
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
        </Fragment>
    );
};

export default ConfigurePage;