import { FETCH_TREE_TABLES } from '../actions/types';

const INITIAL_STATE = {
	all: {
		'origins' : [],
		'trees_category' : [],
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