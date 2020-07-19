var Xhr = {
	init: function(options) {
		var inst = Object.create(this);
		return inst;
	},
	send: function(endpoint, parameters, callback) {
		if (parameters.body) {
			parameters.body = JSON.stringify(parameters.body);
		}

		fetch(endpoint, parameters)
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