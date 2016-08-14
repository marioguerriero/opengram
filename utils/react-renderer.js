var fs = require("fs");
var handlebars = require("handlebars");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var browserify = require("browserify");
var literalify = require("literalify");

var renderer = function(templatePath, components, response) {
  // Read the file first
  fs.readFile(templatePath, "utf-8", function(err , data) {
    if(err) return;

    // Load handlebars template
    var template = handlebars.compile(data);
    var html = template(components);

    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  });
};

module.exports = renderer;
