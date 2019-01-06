import { globals } from '../config.js';
import {
    CATEGORIES_TREES_FILTER,
    ORIGINS_FILTER,
    TREES_FILTER,
} from '../actions/types';

const INITIAL_STATE = {
	categoriesTrees: [],
    origins: [],
    search: '',
    count: 0,
    offset: 0,
    limit: globals.ADMIN_ENTRIES_PER_PAGE
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CATEGORIES_TREES_FILTER:
            return { ...state, categoriesTrees: action.payload };
        case ORIGINS_FILTER:
            return { ...state, origins: action.payload };
    }
    return state;
}