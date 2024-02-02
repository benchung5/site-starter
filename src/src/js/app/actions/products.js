import xhr from '../xhr';
import appStateStore from '../storage/appStateStore';
import { getUrlParams } from '../lib/utils';
import productListStore from '../storage/productListStore';
import { formatSearchString } from '../lib/stringUtils';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

export function getProducts(searchObj, callback) {
	xhr.send(`${SERVER_URL}/products/search/${searchObj}`, 
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