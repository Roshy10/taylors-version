import {
    Backdrop,
    Checkbox,
    CircularProgress,
    Collapse,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import {concat, flatten, includes, isArray, uniq, without} from "lodash";
import React, {Fragment, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {useDeepCompareEffect} from "use-deep-compare";
import {getAllTracksForPlaylists, getPlaylists} from "../../actions/PlaylistActions";
import {requestTrackDetails} from "../../actions/TrackActions";
import MediaArtwork from "../../components/MediaArtwork";
import useAuthToken from "../../hooks/useAuthToken";

const useStyles = makeStyles((theme) => ({
    formGroup: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    listTitle: {
        fontSize: "2rem",
    },
    expanded: {
        backgroundColor: theme.palette.grey["200"],
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
    trackText: {
        flex: "1 1 50%",
    },
    backdrop: {
        zIndex: theme.zIndex.tooltip + 1,
        color: "#fff",
    },
}));

export const Configure = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useAuthToken();
    const playlists = useSelector(state => state.PlaylistReducer.playlists);
    const replacementTracks = useSelector(state => state.TrackReducer.tracks);
    const userId = useSelector(state => state.AuthReducer.id);
    const loading = useSelector(state => state.HttpReducer.inFlight) > 0;
    const [expandedPlaylists, setExpandedPlaylists] = useState([]);
    const [includePublic, setIncludePublic] = useState(true);
    const [includeCollab, setIncludeCollab] = useState(true);
    const [includeOthers, setIncludeOthers] = useState(false);
    const [excludedPlaylists, setExcludedPlaylists] = useState([]);

    useEffect(() => {
        // make request for playlists
        dispatch(getPlaylists());
    }, []);

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
        dispatch(getAllTracksForPlaylists(filteredPlaylists.map((playlist) => playlist.id)));
    }, [filteredPlaylists]);

    const swappablePlaylists = filteredPlaylists.filter((playlist) => isArray(playlist.tracks) && playlist.tracks.length > 0);

    useDeepCompareEffect(() => {
        const replacementTracks = flatten(
            swappablePlaylists
                .map((playlist) => playlist.tracks),
        ).map((track) => track.replacement);

        dispatch(requestTrackDetails(replacementTracks));
    }, [swappablePlaylists]);

    if (!token) {
        // token isn't valid, back to home screen
        return <Redirect to="/"/>;
    }

    const Track = (track) => {
        const replacementTrack = replacementTracks && replacementTracks[track.replacement];
        return (
            <ListItem className={classes.nested} key={track.uri}>
                <MediaArtwork externalUrls={track.external_urls} images={track.album && track.album.images}/>
                <ListItemText className={classes.trackText} primary={track.name} secondary={track.album && track.album.name}/>

                {replacementTrack && (
                    <Fragment>
                        <ListItemIcon>
                            <ArrowRightAltIcon/>
                        </ListItemIcon>
                        <MediaArtwork
                            externalUrls={replacementTrack.external_urls}
                            images={replacementTrack.album && replacementTrack.album.images}
                        />
                        <ListItemText
                            className={classes.trackText}
                            primary={replacementTrack.name}
                            secondary={replacementTrack.album && replacementTrack.album.name}
                        />
                    </Fragment>
                )}
            </ListItem>
        );
    };

    const Playlist = (playlist) => {
        const isExcluded = includes(excludedPlaylists, playlist.id);

        const isExpanded = includes(expandedPlaylists, playlist.id);
        const handleClick = () => setExpandedPlaylists(isExpanded
            ? without(expandedPlaylists, playlist.id)
            : concat(expandedPlaylists, playlist.id),
        );

        return (
            <Fragment key={playlist.id}>
                <ListItem button className={isExpanded ? classes.expanded : null} onClick={handleClick}>
                    <MediaArtwork externalUrls={playlist.external_urls} images={playlist.images}/>
                    <ListItemText primary={playlist.name} secondary={playlist.owner.id}/>
                    {isExpanded ? <ExpandLess/> : <ExpandMore/>}
                    <ListItemSecondaryAction>
                        <Checkbox
                            checked={!isExcluded}
                            edge="end"
                            onChange={() => {
                                setExcludedPlaylists((prevState => isExcluded
                                        ? without(prevState, playlist.id)
                                        : uniq(concat(prevState, playlist.id))
                                ));
                            }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse unmountOnExit in={isExpanded} timeout="auto">
                    <List disablePadding component="div">
                        {isArray(playlist.tracks) && playlist.tracks.map(Track)}
                    </List>
                </Collapse>
            </Fragment>
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
            <List>
                {swappablePlaylists.map(Playlist)}
            </List>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress/>
            </Backdrop>
        </Fragment>
    );
};

export default Configure;