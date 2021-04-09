import {includes, isArray} from "lodash";
import {all, put, select, takeEvery} from "redux-saga/effects";
import {getPlaylistTracks, requestPlaylistTracks} from "../actions/PlaylistActions";

// searches for playlists which still have an object ih the "tracks" field, i.e the ones we still need to get a tracklist for
// this skips over the ones which are loading, where the tracks field is just the string "loading"
// it also skips the ones we already have, as these are arrays
const findTracklessPlaylists = (playlists) => playlists
    .filter((playlist) => playlist.tracks !== "loading" && !isArray(playlist.tracks))
    .map((playlist) => playlist.id);

function* requestPlaylists(action) {
    // find all playlists we don't have a full track list for
    let playlists = yield select((state => state.PlaylistReducer.playlists));

    // only include the ones we have requested (this may be substantially less than all playlists visible to the user)
    let filteredPlaylists = playlists.filter((playlist) => includes(action.payload.playlists, playlist.id));

    // further restrict the only requesting data for playlists we don't already have details on
    let playlistsToInterrogate = findTracklessPlaylists(filteredPlaylists);

    // dispatch a request for each playlist to gather track info
    yield all(playlistsToInterrogate.map((playlist) => put(requestPlaylistTracks(playlist))));
}

function* getPlaylists(action) {
    yield put(getPlaylistTracks(action.payload.playlistId));
}

function* PlaylistSaga() {
    yield takeEvery("PLAYLIST/ALL_TRACKS", requestPlaylists);
    yield takeEvery("PLAYLIST/REQUEST_TRACKS", getPlaylists);
}

export default PlaylistSaga;