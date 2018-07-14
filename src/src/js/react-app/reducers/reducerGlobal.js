import {
    CATEGORIES_FILTER,
    THEMES_FILTER
} from '../actions/types';

const INITIAL_STATE = {
	categories: [],
	themes: [],
    search: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CATEGORIES_FILTER:
            return { ...state, categories: action.payload };
        case THEMES_FILTER:
            return { ...state, themes: action.payload };
    }
    return state;
}