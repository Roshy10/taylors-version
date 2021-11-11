import {CssBaseline, ThemeProvider} from "@material-ui/core";
import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import LandingLayout from "./components/LandingLayout";
import rootReducer from "./reducers/rootReducer";
import theme from "./themes/theme";

const store = createStore(rootReducer);

function Landing() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <LandingLayout/>
            </ThemeProvider>
        </Provider>
    );
}

export default Landing;