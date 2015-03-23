import Flux from "delorean.js";
import React from "react";
import Immutable from "immutable";

import Dispatcher from "./dispatcher";
import Router from "./components/router";
import Channels from "./channels";

window.App = {};
window.App.Dispatcher = Dispatcher;
window.App.Channels = Channels;

window.App.getToken = function(){
  return App.Dispatcher.getStore("auth").data.token;
}

if(App.getToken()){
  App.Socket = App.Channels.createSocket();
  App.Channels.init(window.App.Socket);
}

Router.start();
