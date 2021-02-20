import {Backdrop, CircularProgress, Collapse, FormControlLabel, FormGroup, IconButton, Switch, Typography, useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Close, Tune} from "@material-ui/icons";
import clsx from "clsx";
import {concat, includes, isArray, without} from "lodash";
import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAllTracksForPlaylists, getPlaylists} from "../actions/PlaylistActions";
import useAuthToken from "../hooks/useAuthToken";
import Notifications from "./Notifications";
import PlaylistList from "./PlaylistList";
import UpdatePlaylistsDialog from "./UpdatePlaylistsDialog";

const useStyles = makeStyles((theme) => ({
    filterButton: {
        float: "right",
    },
    updateButton: {
        marginTop: theme.spacing(1.5),
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(1),
        },
    },
    listTitle: {
        fontSize: "2rem",
        marginTop: theme.spacing(1),
    },
    filters: {
        [theme.breakpoints.up("md")]: {
            float: "right",
        },
    },
    formGroup: {
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(1),
        },
    },
    noneFound: {
        fontSize: "2rem",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
        },
    },
    backdrop: {
        zIndex: theme.zIndex.tooltip + 1,
        color: "#fff",
    },
}));

export const ConfigurePage = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const compactFilters = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const token = useAuthToken();
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.PlaylistReducer.playlists);
    const userId = useSelector(state => state.AuthReducer.id);
    const loading = useSelector(state => state.HttpReducer.inFlight) > 0;
    const [includePublic, setIncludePublic] = useState(true);
    const [includeCollab, setIncludeCollab] = useState(true);
    const [includeOthers, setIncludeOthers] = useState(false);
    const [filtersExpanded, setFiltersExpanded] = useState(false);
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

    const replacements = swappablePlaylists
        // strip off the playlists the user has excluded
        .filter((playlist) => !includes(excludedPlaylists, playlist.id));

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

    const FormButtons = ({className}) => (
        <FormGroup row className={clsx(className, classes.filters)}>
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
    );

    return (
        <Fragment>
            {compactFilters
                ? (<Fragment>
                    <IconButton
                        className={classes.filterButton}
                        onClick={() => setFiltersExpanded((val) => !val)}
                    >
                        {filtersExpanded ? <Close/> : <Tune/>}
                    </IconButton>
                    <Collapse className={classes.filters} in={filtersExpanded}>
                        <FormButtons/>
                    </Collapse>
                </Fragment>)
                : (<FormButtons className={classes.filters}/>)
            }
            <UpdatePlaylistsDialog ButtonProps={{className: classes.updateButton}} replacements={replacements}/>
            {(swappablePlaylists.length > 0 || loading)
                ? <PlaylistList
                    data={swappablePlaylists}
                    excludedPlaylists={excludedPlaylists}
                    toggleExcludedPlaylist={toggleExcludedPlaylist}
                />
                : <Typography className={classes.noneFound}>
                    {t("process.configure.noneFound")}
                </Typography>
            }
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
            <Notifications/>
        </Fragment>
    );
};

export default ConfigurePage;