import { authUser, signOutUser } from '../../actions/users';

var Auth = {
	signOutUser: function() {
		signOutUser();
	},
	authenticate: function(callback) {
		authUser((apiData) => {
			callback(apiData);
		});
	}
}

export default Auth