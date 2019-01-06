import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import { isLoading } from '../internalLoad';

import {
	CATEGORIES_TREES_FILTER,
	ORIGINS_FILTER,
	SEARCH_TREES
} from '../types';

export function filterCategoriesTrees(filteredCats) {
	return {
		type: CATEGORIES_TREES_FILTER,
		payload: filteredCats
	}
}

// export function populateCatFilter(selectedCategoriesTrees) {
// 	return function(dispatch) {
// 		axios.get(`${SERVER_URL}/categories_trees/all`)
// 		.then((response) => {
// 			var modifiedData = [];
// 			//add an active state to each returned object
// 			if (response.data) {
// 				modifiedData = response.data.map((item, index) => {
//                     let isActive = true;

//                     // if url contains selected categories, just select those
//                     if (selectedCategoriesTrees) {
//                         isActive = false;
//                         if (selectedCategoriesTrees.indexOf(item.slug) > -1) {
//                             isActive = true;
//                         }
//                     }

// 					return { id: item.id, name: item.name, slug: item.slug, icon: item.icon, active: isActive };
// 				});

// 				dispatch({
// 					type: CATEGORIES_TREES_FILTER,
// 					payload: modifiedData
// 				});
// 			}
// 		}).catch((err) => {
// 			console.log('error fetching trees categories for filtering: ', err);
// 		});

// 	}
// }

export function filterOrigins(filteredOrigins) {
	return {
		type: ORIGINS_FILTER,
		payload: filteredOrigins
	}
}

// export function populateOriginsFilter(selectedOrigins) {
// 	return function(dispatch) {
// 		axios.get(`${SERVER_URL}/origins/all`)
// 		.then((response) => {
// 			var modifiedData = [];
// 			//add an active state to each returned object
// 			if (response.data) {
// 				modifiedData = response.data.map((item, index) => {
// 					let isActive = true;

//                     // if url contains selected origins, just select those
//                     if (selectedOrigins) {
//                         isActive = false;
//                         if (selectedOrigins.indexOf(item.slug) > -1) {
//                             isActive = true;
//                         }
//                     }

// 					return { id: item.id, name: item.name, slug: item.slug, active: isActive };
// 				});
// 				dispatch({
// 					type: ORIGINS_FILTER,
// 					payload: modifiedData
// 				});
// 			}
// 		}).catch((err) => {
// 			console.log('error fetching origins for filtering: ', err);
// 		});

// 	}
// }

export function populateTreesFilter(selectionFromUrl) {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/tree_tables/all`)
        .then((response) => {
            var categoryTreesData = [];
            var originsData = [];
            // var originsData = [];
            var modifiedData = [];
            //add an active state to each returned object
            if (response.data) {
                categoryTreesData = response.data.trees_category.map((item, index) => {
                    //set all to active by default
                    let isActive = true;

                    // if url contains selected categories, just select those
                    if (selectionFromUrl.selectedTreesCategories) {
                        isActive = false;
                        if ((selectionFromUrl.selectedTreesCategories.length > 0) && (selectionFromUrl.selectedTreesCategories.indexOf(item.slug) > -1)) {
                            isActive = true;
                        }
                    }

                    return {id: item.id, name: item.name, slug: item.slug, active: isActive};
                });

                originsData = response.data.origins.map((item, index) => {
                    //set all to active by default
                    let isActive = true;

                    // if url contains selected categories, just select those
                    if (selectionFromUrl.selectedTreesOrigines) {
                        isActive = false;
                        if ((selectionFromUrl.selectedTreesOrigines.length > 0) && (selectionFromUrl.selectedTreesOrigines.indexOf(item.slug) > -1)) {
                            isActive = true;
                        }
                    }

                    return {id: item.id, name: item.name, slug: item.slug, active: isActive};
                });

                dispatch({
                    type: ORIGINS_FILTER,
                    payload: originsData
                });

                dispatch({
                    type: CATEGORIES_TREES_FILTER,
                    payload: categoryTreesData
                });
            }
        }).catch((err) => {
            console.log('error fetching origins for filtering: ', err);
        });

    }
}

//perform the search
export function searchTrees(searchObj) {
    return function(dispatch) {
        dispatch(isLoading(true));
    	let query = buildQuery(searchObj);
        console.log(query);
    	//set the obj in the get request
        axios.get(`${SERVER_URL}/trees/search/`, { params: query })
        .then(response => {
            dispatch({
                type: SEARCH_TREES,
                //payload: formatMarkerCoords(response.data)
                payload: response.data
             });
            dispatch(isLoading(false));
        })
        .catch((err) => {
            console.log('error searching trees: ', err);
        });
    }

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset and limit as is
        query.search = inObj.search;
        query.offset = inObj.offset;
        query.limit = inObj.limit;

    	//format categoriesTrees, query only active ones
    	if (inObj.categoriesTrees) {
    		//return a new array without undefined
    		let catArray = inObj.categoriesTrees.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.categoriesTrees = catArray;
    	}

    	//format categoriesTrees, query only active ones
    	if (inObj.origins) {
    		//return a new array without undefined
    		let originsArray = inObj.origins.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.origins = originsArray;
    	}

    	return query;
    }

}

