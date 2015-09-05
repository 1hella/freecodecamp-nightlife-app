'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Get list of bars from the yelp API for a location
exports.show = function(req, res) {
  var location = req.params.location;
  var yelp = require('yelp').createClient({
    consumer_key: config.yelp.consumerKey,
    consumer_secret: config.yelp.consumerSecret,
    token: config.yelp.token,
    token_secret: config.yelp.tokenSecret
  });

  yelp.search({term: 'bars', location: location}, function(err, data) {
    if (err) return handleError(res, err);
    return res.status(200).json(data);
  });
};

// // Get a single bar
// exports.show = function(req, res) {
//   Bar.findById(req.params.id, function (err, bar) {
//     if(err) { return handleError(res, err); }
//     if(!bar) { return res.status(404).send('Not Found'); }
//     return res.json(bar);
//   });
// };

function handleError(res, err) {
  return res.status(500).send(err);
}
