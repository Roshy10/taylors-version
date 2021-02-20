import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import HttpReducer from "./HttpReducer";
import NotificationReducer from "./NotificationReducer";
import PlaylistReducer from "./PlaylistReducer";
import TrackReducer from "./TrackReducer";

const rootReducer = combineReducers({
    AuthReducer,
    HttpReducer,
    NotificationReducer,
    PlaylistReducer,
    TrackReducer,
});

export default rootReducer;