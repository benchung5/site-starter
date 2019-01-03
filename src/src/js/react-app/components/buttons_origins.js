import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterOrigins } from '../actions/globalTrees';
// import { isLoading } from '../actions/internalLoad';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams } from '../lib/utils';

class ButtonsOrigins extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	onUpdateData(modifiedData) {
		//start the loader for just a second
		//real timming cussion is handled in loader_internal
		// this.props.dispatch(isLoading(true));
		// setTimeout(() => {
		// 	this.props.dispatch(isLoading(false));
		// }, 200);

		// store the selected origins in the hash
		let themeSlugs = modifiedData.filter((item) => {
			if(item.active == true) {
				return true;
			} else {
				return false;
			}
		}).map((item) => {
			return item.slug;
		});
		let origins = themeSlugs.join('+');

		//update the has url with the selected origins
		setUrlParams('origins', origins);

		this.props.dispatch(filterOrigins(modifiedData));
	}

	render() {
		if (this.props.filteredOrigins.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Origins'
			          height={this.buttonHeight  * this.props.filteredOrigins.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredOrigins}
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
		filteredOrigins: state.globalTrees.origins,
	}
}

export default connect(mapStateToProps)(ButtonsOrigins);

