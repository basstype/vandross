import React from "react"
import Router from "react-router"

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

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

export default function startRouter(){
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById("view"));
  }); 
}
