import xhr from '../xhr';
import store from '../store';

export function getSingle(endpoint, callback) {
	xhr.send({
		endpoint: endpoint,
		method: 'GET'
	}, (apiData) => {
		store.setData({'apiData': apiData});
		callback(apiData);
	});
}