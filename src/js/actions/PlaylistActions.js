
const storePlaylists = (playlists) => ({
    type: "PLAYLIST/STORE",
    data: playlists
});

export const getPlaylists = ({
    type: "PLAYLIST/COLLECT",
    payload:{
        url: "/me/playlists",
        limit: 50
    },
    onSuccessAction: storePlaylists
});