import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateThemeFilter, filterThemes } from '../actions/global';
import { isLoading } from '../actions/internalLoad';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';

class ThemesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}

	}

	componentWillMount() {
		//populate the filter with initial data
		this.props.dispatch(populateThemeFilter());
	}

	onUpdateData(modifiedData) {
		//start the loader for just a second
		//real timming cussion is handled in loader_internal
		this.props.dispatch(isLoading(true));
		setTimeout(() => {
			this.props.dispatch(isLoading(false));
		}, 200);

		this.props.dispatch(filterThemes(modifiedData));
	}

	render() {
		return (
		        <Dropdown
		          classProp="themes-dropdown"
		          name={labels[this.props.lang].themesTitle}
		          img='theme.svg'
		          height={360}
		        >
		         <ButtonList
		         	wrapperClass="halves"
		         	classProp="themes"
		         	classPropButton="list-button"
		         	buttonData={this.props.filteredThemes}
		         	updateData={this.onUpdateData.bind(this)}
		         />
		        </Dropdown>
			)
	}

}

function mapStateToProps(state) {
	return {
		filteredThemes: state.global.themes,
		lang: state.language.lang,
	}
}

export default connect(mapStateToProps)(ThemesButtons);

