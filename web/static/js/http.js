import JQuery from "jquery";

export function get(url, done, fail, anonymous = false){
  JQuery.ajax({
      url: url,
      type: 'get',
      headers: setHeaders(anonymous),
      dataType: 'json'
  }).done(done).fail(fail);
}

export function post(url, data, done, fail, anonymous = false){
  JQuery.ajax({
      url: url,
      type: 'post',
      data: data,
      headers: setHeaders(anonymous),
      dataType: 'json'
  }).done(done).fail(fail);
}

function setHeaders(anonymous = true){
  let headers = {}

  if(!anonymous){
    let token = window.App.Dispatcher.getStore("auth").data.token;
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers;
}