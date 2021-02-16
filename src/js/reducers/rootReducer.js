import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import HttpReducer from "./HttpReducer";
import PlaylistReducer from "./PlaylistReducer";
import TrackReducer from "./TrackReducer";

const rootReducer = combineReducers({
    AuthReducer,
    HttpReducer,
    PlaylistReducer,
    TrackReducer,
});

export default rootReducer;