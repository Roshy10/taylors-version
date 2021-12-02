const HttpReducer = (state = {inFlight: 0, totalSent: 0}, action) => {
    switch (action.type) {

        case "HTTP/SENT":
            return {
                inFlight: state.inFlight + 1,
                totalSent: state.totalSent + 1,
            };

        case "HTTP/RECEIVED":
            return {...state, inFlight: state.inFlight - 1};

        case "HTTP/RESET_TOTAL":
            return {...state, totalSent: 0};

        default:
            return state;
    }
};

export default HttpReducer;