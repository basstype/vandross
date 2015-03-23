import React from "react"
import { default as ReactRouter }from "react-router"

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;

import Layout from "./layout"
import Dashboard from "./dashboard"
import Settings from "./settings"
import Login from "./login"

var routes = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="login" handler={Login}/>
    <Route name="settings" handler={Settings}/>
    <DefaultRoute handler={Dashboard} />
  </Route>
);

let Router = {
  start: function(){
    ReactRouter.run(routes, function (Handler) {
      React.render(<Handler/>, document.getElementById("view"));
    }); 
  }
};

export default Router;
