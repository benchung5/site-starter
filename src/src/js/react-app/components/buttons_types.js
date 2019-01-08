import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateCatFilter, filterCategories } from '../actions/global';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, getUrlParams, flattenActiveObjArray } from '../lib/utils';

class TypesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	componentWillMount() {
		let selectedCategories = getUrlParams('categories');
		//populate the filter with initial data
		this.props.dispatch(populateCatFilter(selectedCategories));
	}

	onUpdateData(modifiedData) {
		//update the hash url with the selected categories
		let categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);

		// dispatch action
		this.props.dispatch(filterCategories(modifiedData));
	}

	render() {
		if (this.props.filterCats.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Type'
			          height={this.buttonHeight * this.props.filterCats.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button icon"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filterCats}
			         	updateData={this.onUpdateData.bind(this)}
			         />
			        </Dropdown>
				)	
		} else {
			return null;
		}

	}

}

function mapStateToProps(state) {
	return {
		filterCats: state.global.categories,
	}
}

export default connect(mapStateToProps)(TypesButtons);

