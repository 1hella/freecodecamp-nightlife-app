'use strict';

var _ = require('lodash');
var Rsvp = require('./rsvp.model');

// Get list of rsvps
exports.index = function(req, res) {
  Rsvp.find(function(err, rsvps) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(rsvps);
  });
};

// Get a single rsvp
exports.show = function(req, res) {
  Rsvp.findOne({
    barName: req.params.barId
  }, function(err, rsvp) {
    if (err) {
      return handleError(res, err);
    }
    if (!rsvp) {
      return res.status(404).send('Not Found');
    }
    return res.json(rsvp);
  });
};

// Upserts a new rsvp in the DB.
exports.create = function(req, res) {
  Rsvp.findOneAndUpdate({
    barName: req.params.barId
  }, {
    $addToSet: {
      usersGoing: req.params.userId
    }
  }, {
    upsert: true,
    new: true
  }, function(err, rsvp) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(rsvp);
  });
};

// Removes a user's Id from the usersGoing array
exports.remove = function(req, res) {
  Rsvp.findOneAndUpdate({
    barName: req.params.barId
  }, {
    $pull: {
      usersGoing: req.params.userId
    }
  }, {
    new: true
  }, function(err, rsvp) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(rsvp);
  });
};

// Updates an existing rsvp in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Rsvp.findById(req.params.id, function(err, rsvp) {
    if (err) {
      return handleError(res, err);
    }
    if (!rsvp) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(rsvp, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(rsvp);
    });
  });
};

// Deletes a rsvp from the DB.
exports.destroy = function(req, res) {
  Rsvp.findById(req.params.id, function(err, rsvp) {
    if (err) {
      return handleError(res, err);
    }
    if (!rsvp) {
      return res.status(404).send('Not Found');
    }
    rsvp.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
