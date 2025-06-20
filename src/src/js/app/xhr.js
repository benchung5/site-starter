//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('./config')[env];

var Xhr = {
	init: function(options) {
		var inst = Object.create(this);
		return inst;
	},
	createQueryString: function(params) {
		// params:
		// {key: 'value', key: [1,2]}
		let queryArray = [];
		for (var key in params) {
		 if (params.hasOwnProperty(key)) {
		 	if (Array.isArray(params[key])) {
		 		params[key].map((item) => {
		 			queryArray.push(key + '[]=' + item);
		 		});
		 			
		 	} else {
		 		queryArray.push(key + '=' + params[key]);	
		 	}
		 }
		}

		let queryString = queryArray.join('&');

		return queryString;
	},
	send: function(endpoint, parameters, callback, query, fullUrl) {
		var url = null;
		if(fullUrl) {
			url = fullUrl;
		} else {
			url = new URL(window.location.origin + endpoint);
		}
		

		if (query) {
			//from: https://fetch.spec.whatwg.org/#fetch-api
			//?search=&offset=0&limit=25&trees[]=3&trees_category_id[]=6&zones[]=1
			//url.search = new URLSearchParams(query).toString();
			url.search = this.createQueryString(query);
		} 

		fetch(url, parameters)
		.then(res => {
			const contentType = res.headers.get("content-type");
			if (res.ok) {
				if (contentType && contentType.indexOf("application/json") !== -1) {
					//convert to json gives another promise .then (below)
					return res.json();
				} else {
					return res.text();
				}

			} else {
				console.log('error, response status: ', res.status);
				return res.json();
			}
		})
		.then(data => {
			let datatest = JSON.stringify(data);
			datatest = datatest.toLowerCase();
			let hasError = datatest.includes('error');
			if(typeof data === 'string' && hasError) {
				callback({error: data});
			}
			if(typeof data === 'string' && hasError) {
				callback({error: data});
			} else {
				//sent the data back
				callback(data);
			}
		})
		.catch(error => console.log('xhr callback error: ', error))
	}
}


var xhr = Xhr.init({});



export default xhr