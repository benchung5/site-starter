import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	ADD_THEME,
	ADD_THEME_ERROR,
	FETCH_THEMES,
	DELETE_THEME,
	GET_THEME,
	UPDATE_THEME
} from '../types';

export function addTheme(formData) {
	return function(dispatch) {
		// post to: http://localhost:8080/api/themes/create
		axios.post(`${SERVER_URL}/themes/create`, formData)
		.then(response => {
			if(response.data.error) {
				dispatch(addThemeError(`there was an error adding the theme: ${response.data.error}`));
			} else {
				dispatch({
					type: ADD_THEME,
					payload: response.data
				});
			}
		})
		.catch((err) => {
			//todo: if request is bad
			dispatch(addThemeError(`there was an error adding the theme: ${err}`));
		});
	}
}

export function fetchThemes() {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/themes/all`)
		.then((response) => {
			dispatch({
				type: FETCH_THEMES,
				payload: response.data
			});
		}).catch((err) => {
			console.log('error fetching themes: ', err);
		});

	}
}

export function deleteTheme({ slug }) {
	return function(dispatch) {
		axios.post(`${SERVER_URL}/themes/delete`, { slug })
		.then((response) => {
			if(response.data.error) {
				console.log('error: ', response.data.error);
			} else {
				dispatch(fetchThemes());
			}
		}).catch((err) => {
			console.log('error deleting the theme: ', err);
		});
	}
}

export function getTheme(slug) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/themes/single?id=${slug}`)
			.then((response) => {
				dispatch({
					type: GET_THEME,
					payload: response.data
				});
			})
			.catch((err) => {
				console.log('error getting theme: ', err);
			});
		}
}

export function updateTheme(formData) {
	return function(dispatch){
		axios.post(`${SERVER_URL}/themes/update`, formData)
			.then((response) => {
				if(response.data.error) {
					dispatch(updateThemeError(`there was an error updating the theme: ${response.data.error}`));
				} else {
					dispatch({
						type: UPDATE_THEME,
						payload: response.data
					});
				}
			})
			.catch((err) => {
				console.log('error upating theme: ', err);
			});
	}

}

export function clearUpdateTheme() {
	return {
		type: UPDATE_THEME,
		payload: ''
	}
}

export function clearTheme() {
	return {
		type: ADD_THEME,
		payload: ''
	}
}

export function addThemeError(error) {
    return {
        type: ADD_THEME_ERROR,
        payload: error
    }
}