import Flux from "delorean.js";
import React from "react";
import Immutable from "immutable";

import Dispatcher from "./dispatcher";
import Router from "./components/router";
import Channels from "./channels";

let App = {
  Dispatcher: Dispatcher,
  Channels: Channels,
  getToken: function(){
    return this.Dispatcher.getStore("auth").data.token;
  },
  Socket: null
}

window.App = App;

if(App.getToken()){
  App.Socket = App.Channels.createSocket();
  App.Channels.init(App.Socket);
}

Router.start();
