import {nth} from "lodash";
import {getRequest} from "./HttpActions";

export const getAllTracksForPlaylists = (playlists) => ({
    type: "PLAYLIST/ALL_TRACKS",
    payload: {
        playlists,
    },
});

const storePlaylists = (playlists) => ({
    type: "PLAYLIST/STORE",
    payload: playlists,
});

export const getPlaylists = () => getRequest(
    "/me/playlists",
    {limit: 50},
    storePlaylists,
);

const storePlaylistTracks = (tracks, action) => ({
    type: "PLAYLIST/ADD_TRACKS",
    payload: {
        tracks,
        // FIXME this makes me feel dirty
        // pull the id out of the request action
        playlistId: nth((action.payload.url || action.payload.fullUrl).split("/"), -2),
    },
});

export const purgePlaylists = () => ({
    type: "PLAYLIST/PURGE",
});

// this will mark the request as loading and then send it
// the purpose is to prevent sending a second request while the first one is still in-flight
// which happens if getAllTracksForPlaylists is call in very quick succession
export const requestPlaylistTracks = (playlistId) => ({
    type: "PLAYLIST/REQUEST_TRACKS",
    payload: {
        playlistId,
    },
});

export const getPlaylistTracks = (playlistId) => getRequest(
    `/playlists/${playlistId}/tracks`,
    {
        limit: 100,
        market: "from_token",
        fields: "next,offset,items(track(name,uri,external_urls,album(images,name)))",
    },
    storePlaylistTracks,
    true,
);