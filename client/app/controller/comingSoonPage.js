angular.module('reactorlounge.comingSoonPage', [])
  .controller('ComingSoonController', ['$scope', '$http', 'comingFeed', function($scope, $http, comingFeed){
    comingFeed.getCurrentUser()
    .then(function (user) {
      console.log('this is the user', user)
      $scope.userphoto = user.data[0].photolink;
      $scope.username = user.data[0].firstName + " " +user.data[0].lastName
    })
	}])
