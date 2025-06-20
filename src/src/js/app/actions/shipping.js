
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

export function printShippingLabel(order_id, callback) {
    xhr.send(`${SERVER_URL}/shipment/print_shipping_label/${order_id}`,
    {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }, (apiData) => {
        // //if no response data, return a formatted object
        // let data = {};
        // if (!apiData ) {
        //     data = {
        //         products: [],
        //     }
        // } else {
        //     data = apiData;
        // }
        callback(apiData);
    });
}