
require("babel-core/register")();

import React from "react";
import moment from "moment";

window.moment = moment;
window.React = React;

window.app = {
  sections: {}
};

window.app.router = require("./Router.jsx");
