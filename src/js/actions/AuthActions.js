
export const storeToken = (token, expiryTime) => ({
    type: "AUTH/SAVE",
    payload:{
        token,
        expiryTime
    }
});

export const expireToken = () => ({
    type: "AUTH/CLEAR"
});