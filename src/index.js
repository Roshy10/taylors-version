import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import Landing from "./js/Landing";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Landing/>, wrapper) : false;