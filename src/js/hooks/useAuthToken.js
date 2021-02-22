import {isEmpty} from "lodash";
import {useSelector} from "react-redux";

const useAuthToken = () => {
    const token = useSelector(state => state.AuthReducer.token);
    const tokenExpiration = useSelector(state => state.AuthReducer.expiryTime);

    const tokenExpired = tokenExpiration <= Date.now();
    const tokenValid = !isEmpty(token) && !tokenExpired;

    return {
        token,
        tokenValid,
    };
};

export default useAuthToken;