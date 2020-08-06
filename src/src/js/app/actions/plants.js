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

export function getPlant(slug, callback) {
    xhr.send(`${SERVER_URL}/trees/single/${slug}`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        //if no response data, return a formatted object
        let data = {};
        if (!apiData ) {
            data = {
                category: [],
                themes: [],
                // make images null so we know it's an intentional clear
                // an empty array makes it show the placeholder image
                images: null
            }
        } else {
            data = apiData;
        }
        callback(data);
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

export function fetchPlantTables(callback) {
    xhr.send(`${SERVER_URL}/tree_tables/all`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        callback(apiData);
    });
}


export function updatePlant(formData) {
    xhr.send(`${SERVER_URL}/trees/update`,
    {
        method: 'POST',
        headers: { 
            'Content-Type': 'multipart/form-data',
        },
        body: { formData }
    }, (apiData) => {
        callback(apiData);
    });
}

// export function updateTree(formData) {
//     //needed for image file submission
//     const config = {
//         headers: { 'content-type': 'multipart/form-data' }
//     }
//     return function(dispatch) {
//         // post to http://192.168.99.100/api/trees/update
//         axios.post( `${SERVER_URL}/trees/update`, formData, config )
//         .then( response => {
//             if(response.data.error) {
//                 dispatch(updateTreeError(`there was an error updating the tree: ${response.data.error}`));
//             } else {
//                 dispatch({
//                     type: UPDATE_TREE,
//                     payload: response.data
//                 });
//             }
//         })
//         .catch((err) => {
//             console.log('there was an error updating the tree: ', err);
//             //dispatch(updateTreeError(`there was an error updating the tree: ${err}`));
//         });
//     }
// }

