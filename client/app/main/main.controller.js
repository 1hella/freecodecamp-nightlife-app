'use strict';

angular.module('freecodecampNightlifeAppApp')
.controller('MainCtrl', function($scope, $http, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.bars = [];

  // Search yelp api for bars matching location
  $scope.search = function(place) {
    $http.get('/api/bars/' + place).
    success(function(data) {
      console.dir(data.businesses);
      $scope.bars = data.businesses;
    });
  };
});
