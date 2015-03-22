import Immutable from "immutable";
import DeLorean from 'delorean.js';
import * as Http from '../http';

let Store = DeLorean.Flux.createStore({ 
  data: { lights: [] },

  setData: function (data) { 
    sessionStorage.setItem(TOKEN, data.token);
    this.data = data; 
    this.emit('change'); 
  }, 

  actions: { 
    'lights': 'getLights',
    'light': 'getLightInfo'
  },

  getLights: function(){
    let outerContext = this;

    Http.get(
      '/api/hue/lights', 
      (data) => outerContext.setData(data), 
      (jqXHR, textStatus, errorThrown) => outerContext.setData({ lights: [], error: textStatus })
    );
  },

  getLightInfo: function(id){
    let outerContext = this;
    
    Http.get(
      '/api/hue/lights', 
      (data) => outerContext.setData(data), 
      (jqXHR, textStatus, errorThrown) => outerContext.setData({ lights: [], error: textStatus })
    );
  }  
}); 

let HueStore = new Store();

export default HueStore;


