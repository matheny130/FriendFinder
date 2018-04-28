var express = require("express");
var bodyParser = require("body-parser");
var path = require("path")
var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");
var friends = require("./app/data/friends")

var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});


app.get("/api/friends", function (req, res) {
  return res.json("./app/data/friends");
});


app.get("/api/friends/:friend", function (req, res) {
  var chosen = req.params.friend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

app.post("/api/friends", function (req, res) {

  var newFriend = req.body;

  newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

  console.log(newFriend);

  friends.push(newFriend);

  res.json(newFriend);
});


app.listen(port, function () {
  console.log("Friend Finder app is listening on port: " + port);
});