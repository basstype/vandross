import * as Http from '../http';
import Immutable from "immutable";
import DeLorean from 'delorean.js';

const TOKEN = "token";

let Store = DeLorean.Flux.createStore({ 
  data: { token: sessionStorage.getItem(TOKEN) },

  setData: function (data) { 
    sessionStorage.setItem(TOKEN, data.token);
    this.data = data; 
    this.emit('change'); 
  }, 

  actions: { 
    'login': 'login',
    'logout': 'logout' 
  },

  login: function(credObj){
    let outerContext = this;

    Http.post(
      '/api/auth',
      credObj, 
      (data) => outerContext.setData(data), 
      (jqXHR, textStatus, errorThrown) => outerContext.setData({ token: null }),
      true;
    );
  },

  isLoggedIn: function(){
    return this.data.token != null;
  },

  logout: function(){
    return this.setData({token: null});
  }
}); 

let AuthStore = new Store();

export default AuthStore;


