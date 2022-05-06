import {assign} from "lodash";

const UpdateReducer = (state = {updateComplete: null}, action) => {
    switch (action.type) {

        case "UPDATE/COMPLETE":
            return assign({}, state, {
                updateComplete: action.payload,
            });

        case "UPDATE/RESET":
            return assign({}, state, {
                updateComplete: null,
            });

        default:
            return state;
    }
};

export default UpdateReducer;