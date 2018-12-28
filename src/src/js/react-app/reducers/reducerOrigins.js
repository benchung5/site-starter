import { FETCH_ORIGINS } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function reducerOrigins(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_ORIGINS:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}