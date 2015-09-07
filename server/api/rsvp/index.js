'use strict';

var express = require('express');
var controller = require('./rsvp.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:barId', controller.show);
router.post('/:barId/:userId', auth.isAuthenticated(), controller.create);
router.put('/:barId/:userId', auth.isAuthenticated(), controller.remove);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;