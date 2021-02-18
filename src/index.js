import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as HashRouter} from "react-router-dom";
import "./i18n";
import App from "./js/App";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(
    <HashRouter basename="/#">
        <App/>
    </HashRouter>
    , wrapper) : false;