 angular.module('reactorlounge.soon', [])

.factory('comingFeed', ['$http', function ($http) {
  return {
  //get request to fetch all messages from /messages
  getCurrentUser: function () {
    return $http({
    method: "GET",
    url: '/currentuser'
    })
   }
  }
}])