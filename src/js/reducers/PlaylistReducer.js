import {assign, uniqBy} from "lodash";

const PlaylistReducer = (state = {playlists: []}, action) => {
    switch (action.type) {

        case "PLAYLIST/STORE": {
            const fullPlaylistList = state.playlists.concat(action.data);
            // dedupe just in case
            return assign({}, {
                playlists: uniqBy(fullPlaylistList, "id"),
            });
        }
        default:
            return state;
    }
};

export default PlaylistReducer;