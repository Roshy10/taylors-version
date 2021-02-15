import {isEmpty} from "lodash";
import {useSelector} from "react-redux";

const useAuthToken = () => {
    const token = useSelector(state => state.AuthReducer.token);
    const tokenExpiration = useSelector(state => state.AuthReducer.expiryTime);

    const tokenValid = !isEmpty(token) && tokenExpiration > Date.now();

    return tokenValid && token;
};

export default useAuthToken;