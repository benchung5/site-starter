
import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import orderFilterStore from '../storage/orderFilterStore';
import orderTablesStore from '../storage/orderTablesStore';
import orderListStore from '../storage/orderListStore';
import { formatSearchString } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getSingle(data, callback) {
	xhr.send(`${SERVER_URL}/orders/single/${data}`, 
	{
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
	}, (apiData) => {
		callback(apiData);
	});
}

export function getOrder(id, callback) {
    xhr.send(`${SERVER_URL}/orders/single/${id}`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        //if no response data, return a formatted object
        let data = {};
        if (!apiData ) {
            data = {
                products: [],
            }
        } else {
            data = apiData;
        }
        callback(data);
    });
}

export function searchOrders(searchObj, callback) {
    // console.log(searchObj); 
    appStateStore.setData({ isLoading: true });
	
    let query = buildQuery(searchObj);

    xhr.send(`${SERVER_URL}/orders/search/`, 
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
        
    	// //format trees_category_id
    	// if (inObj.trees_category_id && (inObj.trees_category_id.length !== 0)) {
    	// 	//return a new array without undefined
    	// 	let catArray = inObj.trees_category_id.reduce(function(result, item) {          
        //       if(item) {

    	// 	    result.push(item.id);
    	// 	  }
    	// 	  return result;
    	// 	}, []);

    	// 	query.trees_category_id = catArray;
    	// }

    	// //format native_to
    	// if (inObj.native_to && (inObj.native_to.length !== 0)) {
    	// 	//return a new array without undefined
    	// 	let nativeToArray = inObj.native_to.reduce(function(result, item) {
    	// 	  // if(item.active) {
        //       if(item) {
    	// 	    result.push(item.id);
    	// 	  }
    	// 	  return result;
    	// 	}, []);

    	// 	query.native_to = nativeToArray;
    	// }

    	return query;
    }
}

export function fetchOrderTables(callback) {
    xhr.send(`${SERVER_URL}/order_tables/all`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateOrder(formData, callback) {
    xhr.send(`${SERVER_URL}/orders/update`,
    {
        method: 'POST',
        body: formData
    }, (apiData) => {
        callback(apiData);
    });
}

export function addOrder(formData, callback) {
    xhr.send(`${SERVER_URL}/orders/create`,
    {
        method: 'POST',
        body: formData,
    }, (apiData) => {
        callback(apiData);
    });
}

export function deleteOrder(order, callback) {
    xhr.send(`${SERVER_URL}/orders/delete`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateFilterFromUrl(callback) {
    //*later on, make this funtion more abstract
    // const selectedCategories = getUrlParams('trees_category_id');
    // const selectedNativeTo = getUrlParams('native_to');
    const search = getUrlParams('search');
    const offset = getUrlParams('offset');

    fetchOrderTables((apiData) => {
        orderTablesStore.setData(apiData);

        // //return just the selected categories
        // let modifiedCategories = plantTablesStore.storageData.trees_category_id.filter((item, index) => {
        //     if (selectedCategories) {
        //         return (selectedCategories.length > 0) && (selectedCategories.indexOf(item.slug) > -1);
        //     }
        // });

        // //return just the selected nativeTo
        // let modifiedNativeTo = plantTablesStore.storageData.native_to.filter((item, index) => {
        //     if (selectedNativeTo) {
        //         return (selectedNativeTo.length > 0) && (selectedNativeTo.indexOf(item.slug) > -1);
        //     }
        // });

        // plantFilterStore.setData({
        //     trees_category_id: modifiedCategories,
        // });

        // plantFilterStore.setData({ 
        //     native_to: modifiedNativeTo, 
        // });

        orderFilterStore.setData({ 
            search: search[0] || '',
            offset: parseInt(offset[0] || 0)
        });

        //search orders
        searchOrders(orderFilterStore.storageData, (apiData) => {
            orderListStore.setData(apiData);

            callback();
        });
    });
}

export function resetFilter(callback) {
    orderFilterStore.setData({ 
        // trees_category_id: [], 
        search: '',
        offset: 0
    });

    //search orders
    searchOrders(orderFilterStore.storageData, (apiData) => {
        orderListStore.setData(apiData);

        callback();
    });
}



