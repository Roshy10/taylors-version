export const storeToken = (token, expiryTime) => ({
    type: "AUTH/SAVE",
    payload: {
        token,
        expiryTime,
    },
});

export const expireToken = () => ({
    type: "AUTH/CLEAR",
});

export const saveUser = ({id, name}) => ({
    type: "AUTH/SAVE_USER",
    payload: {
        id,
        name,
    },
});