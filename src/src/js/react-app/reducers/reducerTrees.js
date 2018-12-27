import settings from '../data/settings.js';
import { 
	FETCH_TREES,
	SEARCH_TREES,
    SEARCH_TREES_ADMIN,
} from '../actions/types';

const INITIAL_STATE = { 
    all:[],
    searchResults: {
        trees: [],
        count: null,
        offset: 0,
        limit: settings.entriesPerPage 
    },
    searchResultsAdmin: {
        trees: [],
        count: null,
        offset: 0,
        limit: settings.entriesPerPage 
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TREES:
            return {...state, all: action.payload};
        case SEARCH_TREES:
        	return {...state, searchResults: action.payload};
        case SEARCH_TREES_ADMIN:
            return {...state, searchResultsAdmin: action.payload};
        default:
            return state;
    }
}