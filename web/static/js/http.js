import JQuery from "jquery";

let Http = {
  setHeaders: function(anonymous = true){
    let headers = {}

    if(!anonymous){
      let token = window.App.Dispatcher.getStore("auth").data.token;
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers;    
  },

  get: function(url, done, fail, anonymous = false){
    JQuery.ajax({
        url: url,
        type: 'get',
        headers: this.setHeaders(anonymous),
        dataType: 'json'
    }).done(done).fail(fail);
  },

  post: function(url, data, done, fail, anonymous = false){
    JQuery.ajax({
        url: url,
        type: 'post',
        data: data,
        headers: this.setHeaders(anonymous),
        dataType: 'json'
    }).done(done).fail(fail);
  }
}

export default Http;



