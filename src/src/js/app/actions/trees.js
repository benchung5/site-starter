import xhr from '../xhr';
import store from '../store';

export function getSingle(endpoint) {
	xhr.send({
		endpoint: endpoint,
		method: 'GET'
	}, (apiData) => {
		store.setData({'apiData': apiData});

		return apiData;
	});
}