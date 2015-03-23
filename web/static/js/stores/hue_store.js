import Immutable from "immutable";
import DeLorean from 'delorean.js';
import * as Http from '../http';

let Store = DeLorean.Flux.createStore({ 
  data: { lights: {}, chan: null },

  setData: function (data) { 
    this.data = data; 
    this.emit('change'); 
  }, 

  setChannel: function (chan) { 
    this.data.chan = chan;

    this.data.chan.on("join", msg => {
      this.data.chan.send("hue:lights", {});
    });

    this.data.chan.on("hue:lights", msg => {
      this.setData({lights: msg, chan: this.data.chan});
    });
  }, 

  removeChannel: function () { 
    this.setData({lights: {}, chan: null});
  }, 

  actions: { 
    'lights': 'getLights',
    'light': 'getLightInfo'
  },

  getLights: function(){
    let outerContext = this;
    this.data.chan.send("hue:lights", {});
  },

  getLightInfo: function(id){
    let outerContext = this;
    return lights[id];
  }  
}); 

let HueStore = new Store();

export default HueStore;


