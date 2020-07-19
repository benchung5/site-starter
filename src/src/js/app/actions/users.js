import xhr from '../xhr';
import store from '../store';

export function signInUser(endpoint, data, callback) {
	xhr.send({
		endpoint: endpoint,
		method: 'POST',
		content: data
	}, (apiData) => {
		store.setData({'apiData': apiData});
		callback(apiData);
	});
}