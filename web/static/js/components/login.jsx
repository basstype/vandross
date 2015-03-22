import React from "react";
import Immutable from "immutable";
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import AuthStore from '../stores/auth_store';
import AuthActions from '../actions/auth_actions';

var Login = React.createClass({
  mixins: [ImmutableRenderMixin],

  getInitialState: function() {
    return { data: Immutable.Map({email: '', password: ''}) };
  },

  onEmailChange: function(e) {
    this.updateState('email', e.target.value);
  },

  onPasswordChange: function(e) {
    this.updateState('password', e.target.value);
  },

  updateState: function(property, value){
    this.replaceState({data: this.state.data.update(property, (v) => value) });    
  },

  handleSubmit: function(e) {
    e.preventDefault();
    AuthActions.login(this.state.data.toObject());
  },

  componentDidMount: function() {
    AuthStore.listener.addListener('change', this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.listener.removeListener('change', this._onChange);
  },

  _onChange: function() {
    if(AuthStore.store.data.token == null){
      alert("Invalid Email or Password");
    }else{
      location.href = "/";
    }
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.onEmailChange} value={this.state.data.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.data.password}/>
        </div>
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    );
  }
});

export default Login