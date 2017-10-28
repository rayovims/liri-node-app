var userInput = process.argv[2];
var inquirer = require("inquirer");
var request = require("request");
var twitterInfo = require("./keys.js");
var spotifyApp = require("./keys.js");
var fs = require("fs");
var dataArr = [];

if (userInput === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        dataArr = data.split(",");
        if (dataArr[0] === "spotify-this-song") {
            spotifyApp.search({ type: 'track', query: dataArr[1] }, function (err, data) {
                console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nLink: https://open.spotify.com/album/" + data.tracks.items[0].album.id + "\nAlbum: " + data.tracks.items[0].album.name);
            });
        };
    });
};

if (userInput === "spotify-this-song") {
    callSpotify();

};

function callSpotify() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the song",
            name: "artist"
        },
    ]).then(function (inquirerResponse) {
        spotifyApp.search({ type: 'track', query: inquirerResponse.artist }, function (err, data) {
            console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nLink: https://open.spotify.com/album/" + data.tracks.items[0].album.id + "\nAlbum: " + data.tracks.items[0].album.name);
        });
    });
}

if (userInput === "movie-this") {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name a movie",
            name: "movie"
        },
    ]).then(function (inquirerResponse) {
        var queryURL = "http://www.omdbapi.com/?t=" + inquirerResponse.movie + "&y=&plot=short&apikey=40e9cece";

        request(queryURL, function (error, response, body) {
            if (JSON.parse(body).Response === "False") {
                console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!")
            } else {
                console.log("Title: " + JSON.parse(body).Title + "\nYear of release: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\nMovie was produced in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
            }
        });
    });
};

if (userInput === "my-tweets") {
    twitterInfo.get('statuses/user_timeline.json?count=20', function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            };
        };
    });
};

