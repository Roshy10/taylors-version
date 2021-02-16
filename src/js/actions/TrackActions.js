import {get} from "./HttpActions";

// you should use this instead of "getTrackDetails" as it:
// - batches requests into 50 at a time
// - converts the uris to ids
// - dedupes repeated values
export const requestTrackDetails = (uris) => ({
    type: "TRACKS/REQUEST",
    payload: uris,
});

// This only takes up to 50 ids in one go
// you should probably use "requestTrackDetails" instead of this
export const getTrackDetails = (ids) => get(
    "/tracks",
    {
        ids,
        market: "from_token",
    },
    storeTracks,
);

const storeTracks = (tracks) => ({
    type: "TRACKS/STORE",
    payload: tracks,
});