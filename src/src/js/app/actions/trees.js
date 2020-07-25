import xhr from '../xhr';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getSingle(data, callback) {
	xhr.send(`${SERVER_URL}/trees/single/${data}`, 
	{
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		callback(apiData);
	});
}

//perform the search
export function searchTrees(searchObj, callback) {

	let query = buildQuery(searchObj);
	//set the obj in the get request
    xhr.send(`${SERVER_URL}/trees/search/`, 
    { 
    	method: 'GET',
    	headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
		callback(apiData);
	}, query);

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset and limit as is
        query.search = inObj.search;
        query.offset = inObj.offset;
        query.limit = inObj.limit;

    	//format categoriesTrees, query only active ones
    	if (inObj.categoriesTrees && (inObj.categoriesTrees.length !== 0)) {
    		//return a new array without undefined
    		let catArray = inObj.categoriesTrees.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.categoriesTrees = catArray;
    	}

    	//format origins, query only active ones
    	if (inObj.origins && (inObj.origins.length !== 0)) {
    		//return a new array without undefined
    		let originsArray = inObj.origins.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.origins = originsArray;
    	}

        //format origins, query only active ones
        if (inObj.zones && (inObj.zones.length !== 0)) {
            //return a new array without undefined
            let zonesArray = inObj.zones.reduce(function(result, item) {
              if(item.active) {
                result.push(item.id);
              }
              return result;
            }, []);

            query.zones = zonesArray;
        }

    	return query;
    }

}

