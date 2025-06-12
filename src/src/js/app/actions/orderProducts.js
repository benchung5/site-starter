import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import { formatSearchString } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getOrderProducts(searchObj, callback) {
	appStateStore.setData({ isLoading: true });
	xhr.send(`${SERVER_URL}/order_products/search/`, 
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
	    appStateStore.setData({ isLoading: false });
	}, searchObj);
}

export function getOrderProduct(id, callback) {
    xhr.send(`${SERVER_URL}/order_products/single/${id}`, 
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        //if no response data, return a formatted object
        let data = {};
        if (!apiData ) {
            data = {}
        } else {
            data = apiData;
        }
        callback(data);
    });
}

export function deleteOrderProduct(product, callback) {
    xhr.send(`${SERVER_URL}/order_products/delete`, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    }, (apiData) => {
        callback(apiData);
    });
}

export function updateOrderProduct(formData, callback) {
    xhr.send(`${SERVER_URL}/order_products/update`,
    {
        method: 'POST',
        body: formData
    }, (apiData) => {
        callback(apiData);
    });
}

export function addOrderProduct(formData, callback) {
    xhr.send(`${SERVER_URL}/order_products/create`,
    {
        method: 'POST',
        body: formData,
    }, (apiData) => {
        callback(apiData);
    });
}

export function fetchOrderProductTables(callback) {
    xhr.send(`${SERVER_URL}/order_product_tables/all`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        callback(apiData);
    });
}