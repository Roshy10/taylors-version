const HttpReducer = (state = {inFlight: 0}, action) => {
    switch (action.type) {

        case "HTTP/SENT":
            return {inFlight: state.inFlight + 1};

        case "HTTP/RECEIVED":
            return {inFlight: state.inFlight - 1};

        default:
            return state;
    }
};

export default HttpReducer;