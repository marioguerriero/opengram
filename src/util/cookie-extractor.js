/* This module exports a function which is a util to
  extract a field from a cookie header */

module.exports = function(cookie, key) {
  var value;

  cookie.split(" ").forEach(function(elem) {
    if(elem.indexOf(key) != -1) {
      value = elem.replace(key+"=","").replace(";","");
      return;
    }
  });
  return value;
};
