(function(app, sb) {

  //controller
  app.controller('Login', ['$scope', '$attrs',
  	function($scope, $attrs) {
  		console.log('controller hit');

  		$scope.form = {
  			email: '',
  			password: '',
  			keepMeIn: false
  		}

  		$scope.login = function() {
  			console.log('login');
  		}

  		$scope.logout = function() {
  			console.log('logout');
  		}
  	}]);

})(onePix.app, onePix.sandbox);
