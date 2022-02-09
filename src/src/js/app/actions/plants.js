import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import plantFilterStore from '../storage/plantFilterStore';
import plantTablesStore from '../storage/plantTablesStore';
import plantListStore from '../storage/plantListStore';
import { formatSearchString } from '../lib/stringUtils';

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

export function searchTrees(searchObj, callback) {
    appStateStore.setData({ isLoading: true });
	
    let query = buildQuery(searchObj);

    xhr.send(`${SERVER_URL}/trees/search/`, 
    { 
    	method: 'GET',
    	headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
		callback(apiData);
        appStateStore.setData({ isLoading: false });
	}, query);

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset, mode and limit as is
        //convert search into comma string
        if (inObj.search) {
            query.search = formatSearchString(inObj.search);
        }
        query.offset = inObj.offset;
        query.limit = inObj.limit;
        if (inObj.mode) {
            query.mode = inObj.mode;
        }
        
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

export function updatePlant(formData, callback) {
    xhr.send(`${SERVER_URL}/trees/update`,
    {
        method: 'POST',
        body: formData
    }, (apiData) => {
        callback(apiData);
    });
}

export function addPlant(formData, callback) {
    xhr.send(`${SERVER_URL}/trees/create`,
    {
        method: 'POST',
        body: formData,
    }, (apiData) => {
        callback(apiData);
    });
}

export function deletePlant(tree, callback) {
    xhr.send(`${SERVER_URL}/trees/delete`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tree)
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateFilterFromUrl(callback) {
    const selectedCategories = getUrlParams('categories');
    const search = getUrlParams('search');
    const offset = getUrlParams('offset');

    fetchPlantTables((apiData) => {
        plantTablesStore.setData(apiData);

        let modifiedCategories = plantTablesStore.storageData.trees_category_id.map((item, index) => {
            // if url contains selected categories, just select those
            let selectedCategories = getUrlParams('categories');
            let isActive = true;
            if (selectedCategories) {
                isActive = false;
                if ((selectedCategories.length > 0) && (selectedCategories.indexOf(item.slug) > -1)) {
                    isActive = true;
                }
            }
            return Object.assign(item, { active: isActive });
        });

        plantFilterStore.setData({ 
            categoriesTrees: modifiedCategories, 
            search: search[0] || '',
            offset: parseInt(offset[0] || 0)
        });

        //search trees
        searchTrees(plantFilterStore.storageData, (apiData) => {
            plantListStore.setData(apiData);

            callback();
        });
    });
}

export function resetFilter(callback) {
    plantFilterStore.setData({ 
        categoriesTrees: [], 
        search: '',
        offset: 0
    });

    //search trees
    searchTrees(plantFilterStore.storageData, (apiData) => {
        plantListStore.setData(apiData);

        callback();
    });
}



