import { FETCH_THEMES } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function reducerCategories(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_THEMES:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}