// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players."

Players = new Meteor.Collection("players");

Session.set("score", -1);
Session.set("name", 1);


if (Meteor.is_client) {
  // Template variables
  Template.leaderboard.players = function () {
    return Players.find({},
        {sort: {score: Session.get("score"), name: Session.get("name")}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? " selected" : '';
  };

  // Events

  Template.leaderboard.events = {
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    // reset all scores
    'click input.reset': function () {
      Players.find().forEach(function(player) {
          Players.update(player, {$set: {score: randomScore()}});
      });
    },
    // add and remove scientist
    'click input.add': function (event) {
      var name = $(event.currentTarget).prev().val();
      if (name && name.length > 4)
        Players.insert({name: name, score: randomScore()});
    },
    'click .player .delete': function () {
      Players.remove(this._id);
    }
  };

  // sorting

  Template.header.events = {
    'click #header .name': function () {
      Session.set("name", Session.get("name") * (-1));
    },
    'click #header .score': function () {
      Session.set("score", Session.get("score") * (-1));
    }
  };

  Template.player.events = {
    'click': function () {
      Session.set("selected_player", this._id);
    }
  };
}

if (Meteor.is_server) {
  var require = __meteor_bootstrap__.require,
    colors = require('colors');

  // On server startup, create some players if the database is empty.
  Meteor.startup(function () {
    console.log("Running Leaderborad on: http://0.0.0.0:3000/".rainbow)

    if (Players.find().count() === 0) {
      console.log('Initializing Players collection...');
      [
        "Ada Lovelace",
        "Grace Hopper",
        "Marie Curie",
        "Carl Friedrich Gauss",
        "Nikola Tesla",
        "Claude Shannon"
      ].forEach(function(name) {
          Players.insert({ name: name });
      });

      Players.find().forEach(function(player) {
        Players.update(player._id, {$set: {score: randomScore()}});
      });

    };

  });
}

function randomScore() {
  return Math.floor(Math.random()*10)*5;
}
