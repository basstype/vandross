let AuthActions = { 
  login: function (data) { 
    window.App.Dispatcher.login(data); 
  },
  logout: function () { 
    window.App.Dispatcher.logout(); 
  } 
};

export default AuthActions;