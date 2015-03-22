import Flux from "delorean.js";
import React from "react";
import Immutable from "immutable";

import startRouter from "./components/router";
import Dispatcher from "./dispatcher";

let App = {};
App.Dispatcher = Dispatcher;
window.App = App;

startRouter();
