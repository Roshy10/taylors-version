import {ThemeProvider} from "@material-ui/core";
import React from "react";
import FaqPage from "./components/FaqPage";
import theme from "./themes/theme";

const Faq = () => {
    return (
        <ThemeProvider theme={theme}>
            <FaqPage/>
        </ThemeProvider>
    );
};

export default Faq;