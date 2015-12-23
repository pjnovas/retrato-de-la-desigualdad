
require("babel-core/register")();

import React from "react";
import moment from "moment";

window.moment = moment;
window.React = React;

var router = require("./Router.jsx");

window.app = {
  router
};
