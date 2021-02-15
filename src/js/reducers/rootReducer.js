import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PlaylistReducer from "./PlaylistReducer";

const rootReducer = combineReducers({
    AuthReducer,
    PlaylistReducer
});

export default rootReducer;