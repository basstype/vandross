let HueActions = { 
  lights: function () { 
    window.App.Dispatcher.lights(); 
  },
  light: function (id) { 
    window.App.Dispatcher.light(id); 
  } 
};

export default HueActions;