import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var {SERVER_URL} = require('../../config')[env];


import {
    FETCH_TREES,
    ADD_TREE,
    UPDATE_TREE,
    GET_TREE,
    ADD_TREE_ERROR,
    UPDATE_TREE_ERROR,
    SEARCH_TREES_ADMIN
    } from '../types';

export function fetchTrees() {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/trees/all`)
        .then(response => {

            dispatch({
                type: FETCH_TREES,
                payload: response.data
             });
            return Promise.resolve();

        })
        .catch((err) => {
            console.log('error fetching trees', err);
            //todo: if request is bad
            // dispatch(fetchTreesError('response.data.error'));
        });
    }
}

export function searchTreesAdmin(searchObj) {
    return function(dispatch) {
        // let query = buildQuery(searchObj);

        //set the obj in the get request
        //axios.get(`${SERVER_URL}/trees/search-admin/`, { params: query })
        axios.get(`${SERVER_URL}/trees/search_admin/`, { params: searchObj })
        .then(response => {
            dispatch({
                type: SEARCH_TREES_ADMIN,
                payload: response.data
             });
        })
        .catch((err) => {
            console.log('error searching trees: ', err);
        });
    }
}

// function buildQuery(inObj) {
//     const query = {};

//     //just include the search as is
//     if (inObj.search) {
//         query.search = inObj.search;
//     }

//     return query;
// }

export function getTree(slug) {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/trees/single/${slug}`)
        .then(response => {
            //if no response data, return a formatted object
            let data = {};
            if (!response.data ) {
                data = {
                    category: [],
                    themes: [],
                    // make images null so we know it's an intentional clear
                    // an empty array makes it show the placeholder image
                    images: null
                }
            } else {
                data = response.data;
            }
            
            dispatch({
                type: GET_TREE,
                payload: data
             });
        })
        .catch((err) => {
            console.log('error getting tree: ', err);
        });
    }
}

export function addTree(formData) {
    //needed for image file submission
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    return function(dispatch) {
        axios.post( `${SERVER_URL}/trees/create`, formData, config )
        .then( response => {
            if(response.data.error) {
                dispatch(addTreeError(`There was an error creating the tree: ${response.data.error}`));
            } else {
                dispatch({
                    type: ADD_TREE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            dispatch(addTreeError(`there was an error creating the tree: ${err}`));
        });
    }
}

export function updateTree(formData) {
    //needed for image file submission
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    return function(dispatch) {
        // post to http://192.168.99.100/api/trees/update
        axios.post( `${SERVER_URL}/trees/update`, formData, config )
        .then( response => {
            if(response.data.error) {
                dispatch(updateTreeError(`there was an error updating the tree: ${response.data.error}`));
            } else {
                dispatch({
                    type: UPDATE_TREE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            console.log('there was an error updating the tree: ', err);
            //dispatch(updateTreeError(`there was an error updating the tree: ${err}`));
        });
    }
}

export function deleteTree(slug, search, offset, limit) {
        return function(dispatch) {
        // post to http://192.168.99.100/trees/delete
        axios.post(`${SERVER_URL}/trees/delete`, { slug })
        .then( response => {
            if(response.data.error) {
                console.log('error: ', response.data.error);
                //dispatch(deleteTreeError(`there was an error deleting the tree: ${response.data.error}`));
            } else {
                //get the new list of trees now that one is deleted
                dispatch(searchTreesAdmin({ search: search, offset: offset, limit: limit }));
            }
        })
        .catch((err) => {
            console.log('error deleting the tree: ', err);
        });
    }
}

export function clearTree() {
    return {
        type: ADD_TREE,
        payload: ''
    }
}

export function clearTreeError(error) {
    return {
        type: ADD_TREE_ERROR,
        payload: ''
    }
}

export function clearUpdateTree() {
    return {
        type: UPDATE_TREE,
        payload: ''
    }
}

export function addTreeError(error) {
    return {
        type: ADD_TREE_ERROR,
        payload: error
    }
}

export function updateTreeError(error) {
    return {
        type: UPDATE_TREE_ERROR,
        payload: error
    }
}