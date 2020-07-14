var Xhr = {
	init: function(options) {
		var inst = Object.create(this);
		return inst;
	},
	send: function(options, callback) {
		var parameters = {
			method: options.method || 'GET'
		}

		if (options.method == 'POST') {
			parameters.headers['Content-Type'] = 'application/json';
			parameters.body = JSON.stringify(options.content);
		}

		fetch(options.endpoint, parameters)
		.then(res => {
			if (res.ok) {
				console.log('fetch to '+ options.endpoint +' successful')
				
			} else {
				console.log('fetch to '+ options.endpoint +' not successful')
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