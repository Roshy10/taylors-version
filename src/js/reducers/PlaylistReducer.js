import {assign, concat, findIndex, isArray, uniqBy} from "lodash";
import spotify from "../../mappings/spotify";

const defaultState = {playlists: []};

const PlaylistReducer = (state = {playlists: []}, action) => {
    switch (action.type) {

        case "PLAYLIST/STORE": {
            const fullPlaylistList = state.playlists.concat(action.payload);
            // dedupe just in case
            return assign({}, {
                playlists: uniqBy(fullPlaylistList, "id"),
            });
        }

        case "PLAYLIST/ADD_TRACKS": {
            const newState = assign({}, state);
            const targetPlaylistIndex = findIndex(state.playlists, (playlist) => playlist.id === action.payload.playlistId);

            // tracks in this payload which can be swapped with a "Taylor's version"
            const swappableTracks = action.payload.tracks
                .filter((obj) => spotify[obj.track && obj.track.uri])
                .map((obj) => ({
                    ...obj.track,
                    index: obj.index,
                    replacement: spotify[obj.track.uri],
                }));

            if (!isArray(newState.playlists[targetPlaylistIndex].tracks)) {
                newState.playlists[targetPlaylistIndex].tracks = [];
            }

            // add the newly collected tracks to the array
            newState.playlists[targetPlaylistIndex].tracks = concat([...newState.playlists[targetPlaylistIndex].tracks], swappableTracks);

            return newState;
        }

        case "PLAYLIST/REQUEST_TRACKS": {
            const newState = assign({}, state);
            const targetPlaylistIndex = findIndex(state.playlists, (playlist) => playlist.id === action.payload.playlistId);

            // mark tracks as loading
            newState.playlists[targetPlaylistIndex].tracks = "loading";

            return newState;
        }

        case "PLAYLIST/PURGE": {
            return defaultState;
        }

        default:
            return state;
    }
};

export default PlaylistReducer;