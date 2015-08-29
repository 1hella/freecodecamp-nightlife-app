'use strict';

angular.module('freecodecampNightlifeAppApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.search = function(place) {
      $scope.bars = [{
        name: 'Ceilis',
        img: 'http://s3-media2.fl.yelpcdn.com/bphoto/-1TIqYcgScfZwBQdxEoLmA/ms.jpg',
        description: 'Takes Reservations, Walk-Ins Welcome, Good For Groups, Take Out, Catering and Outdoor Seating',
        going: 0
      }, {
        name: 'The grocery Cocktail & social',
        img: 'http://s3-media2.fl.yelpcdn.com/bphoto/sZOOj-v-z-dnfVu6G6O8GA/ms.jpg',
        description: 'Food is amazing! We ordered the spiced nuts (perfectly cooked and seasoned, definitely recommend), Mac and cheese with ham hock (really good, make sure to...',
        going: 0
      }];
    };
  });
