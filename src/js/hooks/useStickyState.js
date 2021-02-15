import React from "react";

const useStickyState = (key = "sticky", initialState = null) => {
    const [state, setState] = React.useState(() => {
        const storedState = localStorage.getItem(key);

        return storedState || initialState;
    });

    React.useEffect(() => {
        localStorage.setItem(key, state);
    }, [state]);

    const clearState = () => localStorage.removeItem(key);

    return [state, setState, clearState];
};

export default useStickyState;