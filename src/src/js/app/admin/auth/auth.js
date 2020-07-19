import { authUser } from '../../actions/users';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];

var Auth = {
	authenticate: function(callback) {
		authUser(`${SERVER_URL}/users/verify`,
		(apiData) => {
			callback(apiData);
		});
	}
}

export default Auth