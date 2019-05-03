import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterZones } from '../actions/globalTrees';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

class ButtonsZones extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 27;
	}

	onUpdateData(modifiedData) {
		//update the has url with the selected zones
		let zoneSlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('zones', zoneSlugs);

		this.props.dispatch(filterZones(modifiedData));
	}

	render() {
		if (this.props.filteredZones.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Zones'
			          height={this.buttonHeight  * this.props.filteredZones.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredZones}
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
		filteredZones: state.globalTrees.zones,
	}
}

export default connect(mapStateToProps)(ButtonsZones);

