var browserify = require('browserify-middleware');
var bodyParser = require('body-parser');
var search = require('./lib/search.js');
var express = require('express');
var app = express();
//var db = require('./lib/db.js');
var Restaurant = require('./models/restaurant.js');
var httpResponseBody = require('./lib/httpResponseBody.js');
var calculateLivability = require('./lib/calculateLivability.js');
var request = require('request-promise')
var APIKeys = require('./apikeys.js')

var shared = ['mithril'];
app.get('/js/vendor-bundle.js', browserify(shared));
app.get('/js/app-bundle.js', browserify('./client/app/index.js', { external: shared }));


app.use(bodyParser.json());

// Non-js static files
app.use(express.static('client/public'));

app.get('/', function (req, res){
 return Restaurant.getInspections('2801033')
 .then( function (restaurantList){
   res.json(restaurantList);
 });
});

//app.get('/crimes', function (req, res){});

app.post('/distance', function(req, res){
  request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + 
  req.body.address+'&destinations='+req.body.workAddress+'&arrival_time=1438610400&key='+ 
  APIKeys.GoogleDistance, function(error, response, body) {
    if (error) throw error;
    res.send(body)
  })
})

app.post('/', function (req, res){
  function milestoMeters(miles){
    return miles / 0.00062137;
  }
  var circle = {
  	latitude: req.body.lat,
  	longitude: req.body.lng,
  	meters: milestoMeters(req.body.radius || 1) ,
  };
  search('Crime', circle)
  .then(function attachCrimestoHttpResponse(crimes){
  	httpResponseBody.crimes = crimes;
  });
  return search('Restaurant', circle)
  .then(function attachRestaurantsToHttpResponse(restaurants){
  	httpResponseBody.restaurants = restaurants;
  	return httpResponseBody;
  })
  .then(function attachSearchInspectionAvgToHttpResponse(httpResponseBody){
    var count = 0;
    var sum = httpResponseBody.restaurants.reduce(function findInspectionAvgFromSearch(total, rest){
      rest.avg && ++count;
      return rest.avg ? total += rest.avg : total;
    }, 0);
    httpResponseBody.searchInspecAvg = sum / count;
    return httpResponseBody;
  })
  .then(function attachCommuteTime(httpResponseBody) {
    request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + 
     req.body.address+'&destinations='+req.body.workAddress+'&arrival_time=1438610400&key='+ 
     APIKeys.GoogleDistance, function(error, response, body) {
      if (error) throw error;
      httpResponseBody.distance = body;
    }).then(function(){return httpResponseBody
  })
  .then(function (httpResponseBody){
    var weights = req.body.weights || {restaurants: 50, crimes: 50};
    calculateLivability(weights, httpResponseBody, req.body.radius);
    res.json(httpResponseBody);
  });
})});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);

