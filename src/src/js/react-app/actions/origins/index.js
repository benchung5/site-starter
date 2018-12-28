import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	// ADD_ORIGIN,
	// ADD_ORIGIN_ERROR,
	FETCH_ORIGINS,
	// DELETE_ORIGIN,
	// GET_ORIGIN,
	// UPDATE_ORIGIN
} from '../types';

// export function addOrigin(formData) {
// 	return function(dispatch) {
// 		// post to: http://localhost:8080/api/origins/create
// 		axios.post(`${SERVER_URL}/origins/create`, formData)
// 		.then(response => {
// 			if(response.data.error) {
// 				dispatch(addOriginError(`there was an error adding the theme: ${response.data.error}`));
// 			} else {
// 				dispatch({
// 					type: ADD_ORIGIN,
// 					payload: response.data
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			//todo: if request is bad
// 			dispatch(addOriginError(`there was an error adding the theme: ${err}`));
// 		});
// 	}
// }

export function fetchOrigins() {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/origins/all`)
		.then((response) => {
			dispatch({
				type: FETCH_ORIGINS,
				payload: response.data
			});
		}).catch((err) => {
			console.log('error fetching origins: ', err);
		});

	}
}

// export function deleteOrigin({ slug }) {
// 	return function(dispatch) {
// 		axios.post(`${SERVER_URL}/origins/delete`, { slug })
// 		.then((response) => {
// 			if(response.data.error) {
// 				console.log('error: ', response.data.error);
// 			} else {
// 				dispatch(fetchOrigins());
// 			}
// 		}).catch((err) => {
// 			console.log('error deleting the theme: ', err);
// 		});
// 	}
// }

// export function getOrigin(slug) {
// 	return function(dispatch) {
// 		axios.get(`${SERVER_URL}/origins/single/${slug}`)
// 			.then((response) => {
// 				dispatch({
// 					type: GET_ORIGIN,
// 					payload: response.data
// 				});
// 			})
// 			.catch((err) => {
// 				console.log('error getting theme: ', err);
// 			});
// 		}
// }

// export function updateOrigin(formData) {
// 	return function(dispatch){
// 		axios.post(`${SERVER_URL}/origins/update`, formData)
// 			.then((response) => {
// 				if(response.data.error) {
// 					dispatch(updateOriginError(`there was an error updating the theme: ${response.data.error}`));
// 				} else {
// 					dispatch({
// 						type: UPDATE_ORIGIN,
// 						payload: response.data
// 					});
// 				}
// 			})
// 			.catch((err) => {
// 				console.log('error upating theme: ', err);
// 			});
// 	}

// }

// export function clearUpdateOrigin() {
// 	return {
// 		type: UPDATE_ORIGIN,
// 		payload: ''
// 	}
// }

// export function clearOrigin() {
// 	return {
// 		type: ADD_ORIGIN,
// 		payload: ''
// 	}
// }

// export function addOriginError(error) {
//     return {
//         type: ADD_ORIGIN_ERROR,
//         payload: error
//     }
// }