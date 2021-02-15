import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import "./i18n";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false;