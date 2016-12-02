angular.module('reactorlounge.profilePage', ['xeditable'])
	// .run(function(editableOptions) {
 //  	editableOptions.theme = 'bs3'; 
	// });
	.controller('ProfilePageController', function($scope, $location, $http, generalFeed){
		generalFeed.getCurrentUser()
		.then(function(res){
			console.log('current user!: ', res);
			var userData = res.data[0];
			$scope.user = {
				name: userData.firstName + ' ' + userData.lastName,
				email: userData.email,
				photo: userData.photolink,
				about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
				hobby1: 'Breathing',
				hobby2: 'Inhaling',
				hobby3: 'Exhaling',
				flick1: 'Lion King',
				flick2: 'Lion King 1.5',
				flick3: 'Lion King II',
				flick4: 'Lion King III',
				read1: 'Berenstein Bears',
				read2: 'The Cat in the Hat',
				read3: 'Green Eggs and Ham',
				read4: 'Where the Wild Things Are',
				stack1: 'Angular' 
			}
			console.log('photolink: ', userData.photolink);
			console.log('scopelink: ', $scope.user.photo);
		})
		.catch(function(err){
			console.log('error!', err);
		})

	})
