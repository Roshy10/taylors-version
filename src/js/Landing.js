import {ThemeProvider} from "@material-ui/core";
import React from "react";
import LandingPage from "./components/LandingPage";
import theme from "./themes/theme";

function Landing() {
    return (
        <ThemeProvider theme={theme}>
            <LandingPage/>
        </ThemeProvider>
    );
}

export default Landing;