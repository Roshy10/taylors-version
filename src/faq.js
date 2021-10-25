import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import Faq from "./js/Faq";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Faq/>, wrapper) : false;