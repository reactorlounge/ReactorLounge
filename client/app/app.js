angular.module('reactorlounge', [
  'ngRoute',
  'reactorlounge.services',
  'reactorlounge.profilePage',
  'reactorlounge.generalPage',
  'reactorlounge.loginPage',
  'reactorlounge.searchPage',
  'reactorlounge.hackOverFlow',
  'reactorlounge.overFlowService',
  'reactorlounge.comingSoonPage',
  'reactorlounge.soon',
  'xeditable',
  'reactorlounge.search'
])
	.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider ){
	 $routeProvider
     .when('/', {
        templateUrl: '../app/views/loginPage.html',
        controller: 'LoginController'
      })
  	  .when('/profile/:userId', {
        templateUrl: '../app/views/profilePage.html',
        controller: 'ProfilePageController'
      })
      .when('/general', {
      templateUrl: '../app/views/general.html',
      controller: 'GeneralFeedController'
    }).when("/search",{
      templateUrl: "../app/views/searchPage.html",
      controller: "SearchController"
    })  
    .when('/overflow', {
      templateUrl: '../app/views/HackOverFlow.html',
      controller: 'HackOverFlowController'
    })

      .when('/resources', {
      templateUrl: '../app/views/comingSoonPage.html',
      controller: 'ComingSoonController'
    })
      .when('/events', {
      templateUrl: '../app/views/comingSoonPage.html',
      controller: 'ComingSoonController'
    })
      .when('/lectures', {
      templateUrl: '../app/views/comingSoonPage.html',
      controller: 'ComingSoonController'
    })
      .when('/jobs', {
      templateUrl: '../app/views/comingSoonPage.html',
      controller: 'ComingSoonController'
    })
      .otherwise({
        redirectTo: '/'
      });
    // $httpProvider.interceptors.push('AttachTokens');
	}]).run(['$http','$window',  '$location', 'editableOptions', function ($http, $window, $location, editableOptions) {
   $http({
      method: "GET",
      url: "/auth"
    }).then(function () {
      $window.location.href = '/#/general'
    })
  }]);

  
