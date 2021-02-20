// The entry point to the replacement chain
import {deleteRequest, postRequest} from "./HttpActions";

export const replaceAll = (replacements) => ({
    type: "REPLACEMENT/ALL",
    payload: replacements,
});

export const insertTrack = (playlistId, trackUri, insertPosition) => postRequest(
    `/playlists/${playlistId}/tracks`,
    {
        uris: trackUri,
        position: insertPosition,
    },
);

export const deleteTracks = (playlistId, trackUris) => deleteRequest(
    `/playlists/${playlistId}/tracks`,
    {tracks: trackUris.map((uri) => ({uri}))},
);

export const replacementFailure = () => ({
    type: "REPLACEMENT/FAILED",
});