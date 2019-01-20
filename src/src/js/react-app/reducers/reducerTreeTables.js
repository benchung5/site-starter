import { FETCH_TREE_TABLES } from '../actions/types';

const INITIAL_STATE = {
	all: {
		'genuses' : [],
		'origins' : [],
		'regions' : [],
		'zones' : [],
		'trees_category' : [],
		'tags' : [],
		'shapes' : [],
		'trunk_arrangements' : [],
		'bark' : [],
		'natural_habitat' : [],
		'common_uses' : [],
		'wood_uses' : [],
		'unique_attractions' : [],
		'tolerances' : [],
		'reproduction_types' : [],
		'break_dormancy_by' : [],
		'conifer_leaf_types' : []
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