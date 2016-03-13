var app = require("./src/app");

app.listen(app.get("port"), app.get("ip"), function() {
  console.log("Server listening on port " + this.address().port);
});
