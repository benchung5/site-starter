import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import { isLoading } from '../internalLoad';

import {
	CATEGORIES_FILTER,
	THEMES_FILTER,
	SEARCH_ARTICLES
} from '../types';

//types
export function filterCategories(filteredCats) {
	return {
		type: CATEGORIES_FILTER,
		payload: filteredCats
	}
}

export function populateCatFilter(selectedCategories) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/categories/all`)
		.then((response) => {
			var modifiedData = [];
			//add an active state to each returned object
			if (response.data) {
				modifiedData = response.data.map((item, index) => {
                    let isActive = true;

                    // if url contains selected categories, just select those
                    if (selectedCategories) {
                        isActive = false;
                        if (selectedCategories.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

					return { id: item.id, name: item.name, slug: item.slug, icon: item.icon, active: isActive };
				});

				dispatch({
					type: CATEGORIES_FILTER,
					payload: modifiedData
				});
			}
		}).catch((err) => {
			console.log('error fetching categories for filtering: ', err);
		});

	}
}

//themes
export function filterThemes(filteredThemes) {
	return {
		type: THEMES_FILTER,
		payload: filteredThemes
	}
}

export function populateThemeFilter(selectedThemes) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/themes/all`)
		.then((response) => {
			var modifiedData = [];
			//add an active state to each returned object
			if (response.data) {
				modifiedData = response.data.map((item, index) => {
					let isActive = true;

                    // if url contains selected themes, just select those
                    if (selectedThemes) {
                        isActive = false;
                        if (selectedThemes.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

					return { id: item.id, name: item.name, slug: item.slug, active: isActive };
				});
				dispatch({
					type: THEMES_FILTER,
					payload: modifiedData
				});
			}
		}).catch((err) => {
			console.log('error fetching themes for filtering: ', err);
		});

	}
}

export function populateFilter(selectedOrigins, selectedTreesCategories) {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/tree_tables/all`)
        .then((response) => {
            var treesCategoryData = [];
            var originsData = [];
            //add an active state to each returned object
            if (response.data) {
                treesCategoryData = response.data.trees_category_id.map((item, index) => {
                    let isActive = true;



                    // if url contains selected categories, just select those
                    if (selectedCategories) {
                        isActive = false;
                        if (selectedCategories.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

                    // if url contains selected Origins, just select those
                    if (selectedOrigins) {
                        isActive = false;
                        if (selectedOrigins.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

                    return {id: item.id, name: item.name, slug: item.slug, active: isActive};
                });
                originsData = response.data.origins.map((item, index) => {
                    let isActive = true;



                    // if url contains selected categories, just select those
                    if (selectedCategories) {
                        isActive = false;
                        if (selectedCategories.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

                    // if url contains selected Origins, just select those
                    if (selectedOrigins) {
                        isActive = false;
                        if (selectedOrigins.indexOf(item.slug) > -1) {
                            isActive = true;
                        }
                    }

                    return {id: item.id, name: item.name, slug: item.slug, active: isActive};
                });
                dispatch({
                    type: THEMES_FILTER,
                    payload: modifiedData
                });
            }
        }).catch((err) => {
            console.log('error fetching themes for filtering: ', err);
        });

    }
}

//perform the search
export function searchArticles(searchObj) {
    return function(dispatch) {
        dispatch(isLoading(true));
    	let query = buildQuery(searchObj);
    	//set the obj in the get request
        axios.get(`${SERVER_URL}/articles/search/`, { params: query })
        .then(response => {
            dispatch({
                type: SEARCH_ARTICLES,
                //payload: formatMarkerCoords(response.data)
                payload: response.data
             });
            dispatch(isLoading(false));
        })
        .catch((err) => {
            console.log('error searching articles: ', err);
        });
    }

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset and limit as is
        query.search = inObj.search;
        query.offset = inObj.offset;
        query.limit = inObj.limit;

    	//format categories, query only active ones
    	if (inObj.categories) {
    		//return a new array without undefined
    		let catArray = inObj.categories.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.category = catArray;
    	}

    	//format categories, query only active ones
    	if (inObj.themes) {
    		//return a new array without undefined
    		let themeArray = inObj.themes.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.themes = themeArray;
    	}

    	return query;
    }

}

