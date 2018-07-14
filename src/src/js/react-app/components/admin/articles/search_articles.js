import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions/articles';
import renderSearch from '../../parts/field_search';
import settings from '../../../data/settings.js';
import { formatSearchString } from '../../../lib/stringUtils';


class SearchFormAdmin extends Component {

	handleFormSubmit(formProps) {
		//call action for data (send the text along with the global data)
		// if empty search, just search with blank string
		if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
			this.props.dispatch(actions.searchArticlesAdmin({ search: [], offset: 0, limit: settings.entriesPerPage }));
		} else {
			//else, query it using keywords
			this.props.dispatch(actions.searchArticlesAdmin({ 
				search: formatSearchString(formProps.search),
				offset: 0,
				limit: settings.entriesPerPage
			}));
		}
	}

	render() {
		const { handleSubmit } = this.props;
		return (
				<form className="search-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<Field
						name="search"
						component={renderSearch}
						placeholder="search"
					/>
				</form>
			)
	}

}

function validate(formProps) {
	const errors = {};

	//validation...
	return errors;
}

function mapStateToProps(state) {
	return {
		// articlesSearch: state.articles.articlesAdmin
	}
}

export default reduxForm({
	form: 'search-form',
	validate
})(
connect(mapStateToProps, actions)(SearchFormAdmin)
);