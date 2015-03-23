import {Socket} from "./phoenix";

let Channels = {
  createSocket: function(){
    return new Socket("ws://" + location.host +  "/ws");
  },

  init: function(socket){
    socket.join("hue:all", { token: App.getToken() }, chan => {
      App.Dispatcher.getStore('hue').setChannel(chan);
    });    
  },

  disconnect: function(socket){
    socket.leave("hue:all");
    App.Dispatcher.getStore('hue').removeChannel();
  }
};

export default Channels;


