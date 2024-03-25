import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import articleFilterStore from '../storage/articleFilterStore';
import articleTablesStore from '../storage/articleTablesStore';
import articleListStore from '../storage/articleListStore';
import { formatSearchString } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getSingle(data, callback) {
	xhr.send(`${SERVER_URL}/articles/single/${data}`, 
	{
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		callback(apiData);
	});
}

export function getArticle(slug, callback) {
    xhr.send(`${SERVER_URL}/articles/single/${slug}`, 
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

export function searchArticles(searchObj, callback) {
    appStateStore.setData({ isLoading: true });
	
    let query = buildQuery(searchObj);

    xhr.send(`${SERVER_URL}/articles/search/`, 
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

    	//format categories, query only active ones
    	if (inObj.categories && (inObj.categories.length !== 0)) {
    		//return a new array without undefined
    		let catArray = inObj.categories.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.categories = catArray;
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

export function fetchArticleTables(callback) {
    xhr.send(`${SERVER_URL}/article_tables/all`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateArticle(formData, callback) {
    xhr.send(`${SERVER_URL}/articles/update`,
    {
        method: 'POST',
        body: formData
    }, (apiData) => {
        callback(apiData);
    });
}

export function addArticle(formData, callback) {
    xhr.send(`${SERVER_URL}/articles/create`,
    {
        method: 'POST',
        body: formData,
    }, (apiData) => {
        callback(apiData);
    });
}

export function deleteArticle(article, callback) {
    xhr.send(`${SERVER_URL}/articles/delete`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(article)
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateFilterFromUrl(callback) {
    const selectedCategories = getUrlParams('categories');
    const search = getUrlParams('search');
    const offset = getUrlParams('offset');

    fetchArticleTables((apiData) => {
        articleTablesStore.setData(apiData);

        let modifiedCategories = articleTablesStore.storageData.categories.map((item, index) => {
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

        articleFilterStore.setData({ 
            categories: modifiedCategories, 
            search: search[0] || '',
            offset: parseInt(offset[0] || 0)
        });

        //search
        searchArticles(articleFilterStore.storageData, (apiData) => {
            articleListStore.setData(apiData);

            callback();
        });
    });
}

export function resetFilter(callback) {
    articleFilterStore.setData({ 
        categoriesTrees: [], 
        search: '',
        offset: 0
    });

    //search
    searchArticles(articleFilterStore.storageData, (apiData) => {
        articleListStore.setData(apiData);

        callback();
    });
}



