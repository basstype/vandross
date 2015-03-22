import React from "react"
import Router from "react-router"
import AuthStore from '../stores/auth_store';
import AuthActions from '../actions/auth_actions';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Layout = React.createClass({
  getInitialState: function() {
    return AuthStore.store.data;
  },

  componentDidMount: function() {
    AuthStore.listener.addListener('change', this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.listener.removeListener('change', this._onChange);
  },

  _onChange: function() {
    this.replaceState(AuthStore.store.data);
  },

  handleClick: function(e){
    e.preventDefault();
    AuthActions.logout();
  },

  renderNav: function(){
    let auth = <li><Link to="login">Login</Link></li>;
    if(this.state.token){
      auth = <li><a href="#" onClick={this.handleClick}>Logout</a></li>;
    }

    return (
      <ul className="nav nav-pills pull-right">
        <li><Link to="app">Home</Link></li>
        <li><Link to="settings">Settings</Link></li>
        {auth}
      </ul>
    )
  },

  render: function () {
    return (
      <div>
        <div className="header row">
          <div className="col-md-6">
            <h2>Vandross</h2>
          </div>
          <div className="col-md-6">
            {this.renderNav()}
          </div>
        </div>
        <RouteHandler/>
      </div>
    );
  }
});

export default Layout