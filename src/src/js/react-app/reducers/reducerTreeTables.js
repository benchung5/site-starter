import { FETCH_TREE_TABLES } from '../actions/types';

const INITIAL_STATE = {
	all: {
		'genuses' : [],
		'origins' : [],
		'regions' : [],
		'zones' : [],
		'trees_category' : [],
		'tags' : [],
	}
};

export default function reducerTreeTables(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_TREE_TABLES:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}