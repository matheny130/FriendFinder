var path = require("path");

var friends = require("../data/friends.js");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post(friends, function (req, res) {

    var bestMatch = {
      name: "",
      image: "",
      difference: 1000,
    };

    var userInput = req.body;
    var userName = userInput.name;
    var userPhoto = userInput.photo;
    var userScores = userInput.scores;

    var totalDifference = 0;
    var allDifference = [];


    for (var i=0; i < friends.length-1; i++) {
      //totalDifference = 0;
      for (var j = 0; j < 10; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        allDifference.push(totalDifference);
        totalDifference = 0;
      }
    }

    var bestMatch = friends[allDifference.indexOf(Math.min.apply(null, allDifference))]
    //friends.push(userInput);

    res.send(bestMatch);
    console.log(bestMatch);
  });
}