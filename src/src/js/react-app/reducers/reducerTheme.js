import {
    ADD_THEME,
    ADD_THEME_ERROR,
    DELETE_THEME,
    UPDATE_THEME,
    GET_THEME
} from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        case ADD_THEME:
            return { ...state, themeAdded: action.payload };
        case ADD_THEME_ERROR:
            return { ...state, addThemeError: action.payload };
        case DELETE_THEME:
        	return { ...state, deletedTheme: action.payload };
        case UPDATE_THEME:
            return { ...state, themeUpdated: action.payload };
        case GET_THEME:
            return { ...state, themeSingle: action.payload };
    }
    return state;
}