import settings from '../data/settings.js';
import { 
	FETCH_ARTICLES,
	SEARCH_ARTICLES,
    SEARCH_ARTICLES_ADMIN,
} from '../actions/types';

const INITIAL_STATE = { 
    all:[],
    searchResults: {
        articles: [],
        count: null,
        offset: 0,
        limit: settings.entriesPerPage 
    },
    searchResultsAdmin: {
        articles: [],
        count: null,
        offset: 0,
        limit: settings.entriesPerPage 
    },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ARTICLES:
            return {...state, all: action.payload};
        case SEARCH_ARTICLES:
        	return {...state, searchResults: action.payload};
        case SEARCH_ARTICLES_ADMIN:
            return {...state, searchResultsAdmin: action.payload};
        default:
            return state;
    }
}