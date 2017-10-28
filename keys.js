var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var twitterKeys = new Twitter({
  consumer_key: 'bz4pEutOd6v523NJkTVLTerV9',
  consumer_secret: 'WNossffAhFrTI5fIH0XPPgJp08Rs4lcXti9UYjnKvGY9wTjb17',
  access_token_key: '923233291351838720-yRR8zrB1ZS7Q1JkjJXujgogE7lBp1i6',
  access_token_secret: '23l1sGGlI7O4f2HjhLAOh7fe7MFFGnpQAPIh9AK0i9vgw',
});

var spotifyApp = new Spotify({
    id: '22e17ef0118a48958ff0b7941ba72b5e',
    secret: "194b413042474fdcb2d9adcc67fe7de3"
  });

module.exports = twitterKeys;
module.exports = spotifyApp;