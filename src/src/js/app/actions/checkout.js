const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

import xhr from '../xhr';


export function calcShippingAndTax(order, callback) {
    xhr.send(`${SERVER_URL}/shipping_and_tax`,
    {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
    }, (apiData) => {
        callback(apiData);
    });
}

export function postOrder(order, callback) {
    xhr.send(`${SERVER_URL}/checkout`,
    {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
    }, (apiData) => {
        callback(apiData);
    });
}