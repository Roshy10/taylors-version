import React from "react";
import {hydrate, render} from "react-dom";
import "./i18n";
import Landing from "./js/Landing";

const wrapper = document.getElementById("container");
if (wrapper.hasChildNodes()) {
    hydrate(<Landing/>, wrapper);
} else {
    render(<Landing/>, wrapper);
}