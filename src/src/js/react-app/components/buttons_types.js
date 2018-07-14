import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateCatFilter, filterCategories } from '../actions/global';
import { isLoading } from '../actions/internalLoad';
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
		//start the loader for just a second
		//real timming cussion is handled in loader_internal
		this.props.dispatch(isLoading(true));
		setTimeout(() => {
			this.props.dispatch(isLoading(false));
		}, 200);

		//update
		this.props.dispatch(filterCategories(modifiedData));
	}

	render() {
		return (
		        <Dropdown
		          classProp="types-dropdown"
		          name={labels[this.props.lang].typesTitle}
		          img='type.svg'
		          height={250}
		        >
		         <ButtonList
		         	wrapperClass="thirds"
		         	classProp="types circleStyle"
		         	classPropButton="circle-button"
		         	buttonData={this.props.filterCats}
		         	updateData={this.onUpdateData.bind(this)}
		         />
		        </Dropdown>
			)
	}

}

function mapStateToProps(state) {
	return {
		filterCats: state.global.categories,
		lang: state.language.lang,
	}
}

export default connect(mapStateToProps)(TypesButtons);

