module.exports = function(req) {
  var cookie = req.headers.cookie;

  var token;

  cookie.split(" ").forEach(function(elem) {
    if(elem.indexOf("token") != -1) {
      token = elem.replace("token=","").replace(";","");
      return;
    }
  });
  return token;
};
