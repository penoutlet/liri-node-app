// Global Variables 


// require twitter package
var twitter= require('Twitter');

// require twitter keys. 
var client = new twitter (require('./keys.js'));

		
// require request package
var request = require("request");

// require spotify package
var spotify = require("spotify");


var nodeArgs = process.argv;

var method = process.argv[2];

		console.log("Method: " + process.argv[2]);
		
var Input = "";

// ----------------------

// if method is twitter... 
if (method === "my-tweets" ){

//clear input var
Input = "";

// for loop to construct unique input
for (var i = 3; i < nodeArgs.length; i++) {
	Input = Input + " " + nodeArgs[i];

}

// save the params for the twitter.
 
var params = {screen_name: Input};
	console.log("Twitter params: " + JSON.stringify(params));


// perform a get from Twitter API		
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 
   	// stringify to make tweets readable and not [object Object], which is default string notation. 
 		console.log("tweets:" + (JSON.stringify(tweets)));
    	console.log("Response:" + JSON.stringify(response));
  if (!error) {
    console.log("tweets:" + tweets);
  }


	
});

} // end of if for twitter

// --------------

// if what user enters is omdb, perform a request. 
if (method === "movie-this") {

var Input = "";

for (var i = 3; i < nodeArgs.length; i++) {

		Input = Input + "+" + nodeArgs[i];

}
console.log("Input: " + Input);

// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" +  Input + "&y=&plot=short&r=json", function(error, response, body) {
// If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("Response: " + (JSON.stringify(response)));
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie was produced in this Year: " + JSON.parse(body).Year);		
    console.log("The movie was produced in this Country: " + JSON.parse(body).Country);
    console.log("The movie is in this language: " + JSON.parse(body).Language);
    console.log("The plot of the movie: " + JSON.parse(body).Plot);
    console.log("The actors are: " + JSON.parse(body).Actors);
    console.log("The Rotten Tomatoes Rating: " + JSON.parse(body));

  }
});
}// end of "if" for omdb

// if method is spotify-this-song
if (method === 'spotify-this-song') {

	Input = "";
for (var i = 3; i < nodeArgs.length; i++){

	Input = Input + " " + nodeArgs[i];
}
spotify.search({ type: 'track', query: Input }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
console.log("Preview link: " + JSON.stringify(data.tracks.href));
console.log("Song's name: " + JSON.stringify(data.tracks.items[1].album.name));	




});
}