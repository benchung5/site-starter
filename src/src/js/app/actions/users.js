import xhr from '../xhr';
import store from '../store';

export function signInUser(endpoint, data, callback) {
	xhr.send(endpoint,
	{
		method: 'POST',
		body: data,
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		store.setData({'apiData': apiData});
		callback(apiData);
	});
}

export function signOutUser() {
	localStorage.removeItem('token');
}

export function authUser(endpoint, callback) {
	xhr.send(endpoint,
	{
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token') },
	}, (apiData) => {
		store.setData({'apiData': apiData});
		callback(apiData);
	});
}