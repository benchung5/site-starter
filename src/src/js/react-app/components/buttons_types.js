import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateCatFilter, filterCategories } from '../actions/global';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';

class TypesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentWillMount() {
		//populate the filter with initial data
		this.props.dispatch(populateCatFilter());
	}

	onUpdateData(modifiedData) {
		//update
		this.props.dispatch(filterCategories(modifiedData));
	}

	render() {
		if (this.props.filterCats.length) {
			return (
			        <Dropdown
			          classProp="types-dropdown"
			          name='Type'
			          height={52 * this.props.filterCats.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp="types"
			         	classPropButton="list-button"
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

