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
	send: function(endpoint, parameters, callback, query) {
		var url = new URL(window.location.origin + endpoint)

		if (query) {
			//from: https://fetch.spec.whatwg.org/#fetch-api
			//?search=&offset=0&limit=25&categoriesTrees[]=3&categoriesTrees[]=6&zones[]=1
			//url.search = new URLSearchParams(query).toString();
			url.search = this.createQueryString(query);
		} 

		fetch(url, parameters)
		.then(res => {
			if (res.ok) {
				//console.log('fetch to '+ options.endpoint +' successful')
				
			} else {
				//console.log('fetch to '+ options.endpoint +' not successful')
			}
			//convert to json gives another promise
			return res.json() 
		})
		.then(data => {
			//sent the data back
			callback(data);
		})
		.catch(error => console.log(error))
	}
}


var xhr = Xhr.init({});



export default xhr