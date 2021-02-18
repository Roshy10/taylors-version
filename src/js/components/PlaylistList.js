import {List} from "@material-ui/core";
import {flatten, includes} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {useDispatch} from "react-redux";
import {useDeepCompareEffect} from "use-deep-compare";
import {requestTrackDetails} from "../actions/TrackActions";
import {playlist} from "../types";
import Playlist from "./Playlist";

const PlaylistList = ({data, excludedPlaylists, toggleExcludedPlaylist}) => {
    const dispatch = useDispatch();

    useDeepCompareEffect(() => {
        // request the details of all the swappable tracks, so we can show their name and album artwork etc...
        const replacementTracks = flatten(
            data.map((playlist) => playlist.tracks),
        ).map((track) => track.replacement);

        dispatch(requestTrackDetails(replacementTracks));
    }, [data]);

    return (
        <List>
            {data.map((playlist) =>
                <Playlist
                    data={playlist}
                    excluded={includes(excludedPlaylists, playlist.id)}
                    key={playlist.id}
                    toggleExcluded={() => toggleExcludedPlaylist(playlist.id)}
                />,
            )}
        </List>
    );
};

PlaylistList.propTypes = {
    data: PropTypes.arrayOf(playlist),
    excludedPlaylists: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleExcludedPlaylist: PropTypes.func.isRequired,
};

export default PlaylistList;