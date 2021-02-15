import {assign} from "lodash";

const AuthReducer = (state = {}, action) => {
    switch (action.type) {

        case "AUTH/SAVE":
            return assign({}, state, {
                token: action.payload.token,
                expiryTime: action.payload.expiryTime,
            });

        case "AUTH/CLEAR":
            return {};

        default:
            return state;
    }
};

export default AuthReducer;