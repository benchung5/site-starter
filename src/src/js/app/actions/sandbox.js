import xhr from '../xhr';
// import { getUrlParams } from '../lib/utils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];


export function getData(callback) {
	xhr.send(`${SERVER_URL}/sandbox/get/}`, 
	{
		method: 'GET',
		headers: {'Content-Type': 'text/html'},
	}, (apiData) => {
		callback(apiData);
	});
}