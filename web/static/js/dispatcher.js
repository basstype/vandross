import DeLorean from 'delorean.js';
import AuthStore from './stores/auth_store';
import HueStore from './stores/hue_store';

var Dispatcher = DeLorean.Flux.createDispatcher({
  login: function(data){
    this.dispatch('login', data);
  },
  logout: function(){
    this.dispatch('logout');
  },
  lights: function(){
    this.dispatch('lights');
  },
  light: function(id){
    this.dispatch('light', id);
  },
  getStores: function(){
    return {auth: AuthStore, hue: HueStore};
  }
})

export default Dispatcher;