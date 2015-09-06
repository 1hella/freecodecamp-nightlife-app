'use strict';

angular.module('freecodecampNightlifeAppApp')
  .controller('MainCtrl', function($scope, $http, $window, Auth) {
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

    $scope.onIsGoing = function(index) {
      if (!Auth.isLoggedIn()) {
        // redirect to login with twitter
        $window.location.href = '/auth/twitter';
        return;
      }

      var bar = $scope.bars[index];

      $http.post('/api/rsvps/' + bar.id + '/' + Auth.getCurrentUser().id)
        .success(function() {

        });

    };
  });
