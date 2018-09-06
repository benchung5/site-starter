import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateCatFilter, filterCategories } from '../actions/global';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, getUrlParams } from '../lib/utils';

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
		// store the selected categories in the hash
		let categorySlugs = modifiedData.filter((item) => {
			if(item.active == true) {
				return true;
			} else {
				return false;
			}
		}).map((item) => {
			return item.slug;
		});
		let categories = categorySlugs.join('+');

		//update the has url with the selected categories
		setUrlParams('categories', categories);

		// dispatch action
		this.props.dispatch(filterCategories(modifiedData));
	}

	render() {
		if (this.props.filterCats.length) {
			return (
			        <Dropdown
			          classProp="types-dropdown"
			          name='Type'
			          height={this.buttonHeight * this.props.filterCats.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp="types"
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

