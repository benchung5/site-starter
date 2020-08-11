import xhr from '../xhr';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function signInUser(data, callback) {
	xhr.send(`${SERVER_URL}/users/sign_in`,
	{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		callback(apiData);
	});
}

export function signOutUser() {
	localStorage.removeItem('token');
}

export function authUser(callback) {
	xhr.send(`${SERVER_URL}/users/verify`,
	{
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token') },
	}, (apiData) => {
		callback(apiData);
	});
}