'use strict';

angular.module('freecodecampNightlifeAppApp')
  .controller('MainCtrl', function($scope, $http, $window, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.bars = [];

    // Search yelp api for bars matching location
    $scope.search = function(place) {
      $scope.error = null;
      $scope.isLoading = true;
      $http.get('/api/bars/' + place).
      success(function(data) {
        $scope.isLoading = false;
        $scope.bars = data.businesses;
        console.dir(data.businesses);

        // get "going" numbers from api for each business.
        $scope.bars.forEach(function(bar, index) {
          $http.get('/api/rsvps/' + bar.id).
          success(function(data) {
            $scope.bars[index].usersGoing = data.usersGoing;
          }).
          error(function(err) {
            console.log('err!', err);
          });
        });
      }).
      error(function(err) {
        $scope.isLoading = false;
        // Error getting search data
        console.dir(JSON.parse(err.data));

        $scope.error = "Error: " + JSON.parse(err.data).error.text;
      });
    };

    /* handles user clicking rsvp button for a bar */
    $scope.onIsGoing = function(index) {
      var bar = $scope.bars[index];

      if (!$scope.isGoing(index)) {
        $http.post('/api/rsvps/' + bar.id + '/' + Auth.getCurrentUser()._id).
        success(function(data) {
          bar.usersGoing = data.usersGoing;
        }).
        error(function(err) {
          console.log('error: ' + err);
        });
      } else {
        $scope.cancelRsvp(index);
      }
    };

    /* return true if current user has rsvp'd to this bar */
    $scope.isGoing = function(index) {
      if ($scope.bars[index].usersGoing && $scope.bars[index].usersGoing.indexOf(Auth.getCurrentUser()._id) !== -1) {
        return true;
      }
      return false;
    };

    /* cancel rsvp */
    $scope.cancelRsvp = function(index) {
      console.log('cancelling rsvp');
      var bar = $scope.bars[index];

      $http.put('/api/rsvps/' + bar.id + '/' + Auth.getCurrentUser()._id).
      success(function(data) {
        bar.usersGoing = data.usersGoing;
      });
    };
  });
