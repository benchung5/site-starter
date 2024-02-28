const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../config')[env];

import xhr from '../xhr';

// export async function postOrder(order) {
// 	const { clientSecret } = await fetch(`${SERVER_URL}/checkout`, {
// 	  method: "POST",
// 	  headers: { "Content-Type": "application/json" },
// 	  body: JSON.stringify({ order }),
// 	}).then((r) => {
// 		r.json().then((p) => {
// 			return p.clientSecret;
// 		});
		
// 	});

// 	console.log(clientSecret);

// 	return clientSecret;

// 	// console.log(clientSecret);
// 	// const { clientSecret } = await fetch(`${SERVER_URL}/checkout`, {
// 	//   method: "POST",
// 	//   headers: { "Content-Type": "application/json" },
// 	//   body: JSON.stringify({ order }),
// 	// }).then((r) => r.json());
// 	// return clientSecret;
// }

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