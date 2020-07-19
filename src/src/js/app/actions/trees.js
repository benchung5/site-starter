import xhr from '../xhr';
import store from '../store';

export function getSingle(endpoint, callback) {
	xhr.send(endpoint, 
	{
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		store.setData({'apiData': apiData});
		callback(apiData);
	});
}