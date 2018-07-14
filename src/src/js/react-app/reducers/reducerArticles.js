import { 
	FETCH_ARTICLES,
	SEARCH_ARTICLES,
    SEARCH_ARTICLES_ADMIN,
} from '../actions/types';

const INITIAL_STATE = { 
    all:[],
    searchResults: [],
    searchResultsAdmin: {
        articles: [],
        count: null,
        offset: null,
        limit: null,  
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