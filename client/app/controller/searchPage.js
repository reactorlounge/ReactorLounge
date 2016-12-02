angular.module('reactorlounge.searchPage', [])
	.controller('SearchController', ['$scope', '$location', '$http', '$window', 'searchFeed', function($scope, $location, $http,$window, searchFeed){
		
		$http.get("/users",function () {
		}).then(function (resp) {
			console.log(resp.data)
			$scope.users = resp.data
		})

    searchFeed.getCurrentUser()
    .then(function (user) {
	  	$scope.userphoto = user.data[0].photolink;
	  	$scope.username = user.data[0].firstName + " " +user.data[0].lastName
	 })

	}])
