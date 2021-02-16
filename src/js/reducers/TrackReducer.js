const TrackReducer = (state = {tracks: {}}, action) => {

    switch (action.type) {

        case "TRACKS/STORE": {
            const tracks = {...state.tracks};
            action.payload.tracks.forEach((track) => {
                tracks[track.uri] = {...track};
            });
            return {tracks};
        }
        default:
            return state;
    }
};

export default TrackReducer;