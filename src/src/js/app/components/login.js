'use strict';

var controllerLogin = function() {

	angular.module('login', []).
		controller('login', function($scope) {

		$scope.form = {
			email: '',
			password: '',
			keepMeIn: false
		}

		$scope.login = function() {
			console.log('logout');
		}

		$scope.logout = function() {
			console.log('logout');
		}
	});

	// angular.module('login', []).
	// 	component('login', {
	// 		//quick version:
	// 		//template: '<div></div>'
	// 		// templateUrl: '/templates/blog-list.html',
	// 		controller: function($scope) {
	// 		}
	// 	});

}

export default controllerLogin;





