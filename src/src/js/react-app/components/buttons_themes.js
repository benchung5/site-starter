import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateThemeFilter, filterThemes } from '../actions/global';
// import { isLoading } from '../actions/internalLoad';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, getUrlParams } from '../lib/utils';

class ThemesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	componentWillMount() {
		let selectedThemes = getUrlParams('themes');
		//populate the filter with initial data
		this.props.dispatch(populateThemeFilter(selectedThemes));
	}

	onUpdateData(modifiedData) {
		//start the loader for just a second
		//real timming cussion is handled in loader_internal
		// this.props.dispatch(isLoading(true));
		// setTimeout(() => {
		// 	this.props.dispatch(isLoading(false));
		// }, 200);

		// store the selected themes in the hash
		let themeSlugs = modifiedData.filter((item) => {
			if(item.active == true) {
				return true;
			} else {
				return false;
			}
		}).map((item) => {
			return item.slug;
		});
		let themes = themeSlugs.join('+');

		//update the has url with the selected themes
		setUrlParams('themes', themes);

		this.props.dispatch(filterThemes(modifiedData));
	}

	render() {
		if (this.props.filteredThemes.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Themes'
			          height={this.buttonHeight  * this.props.filteredThemes.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredThemes}
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
		filteredThemes: state.global.themes,
	}
}

export default connect(mapStateToProps)(ThemesButtons);

