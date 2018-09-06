import { connect } from 'react-redux';
import React, { Component } from 'react';
import ButtonComponent from './parts/button_component';
import { showMenu } from '../actions/sideMenu';
import { viewsToggle } from '../actions/views';
import { showSingle } from '../actions/showSingle';
import { globals } from '../config';

class SideMenuButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			windowOpen: false,
		}
	}

	onItemClick(event) {
		event.preventDefault();
		if(this.props.showMenu === 'open') {
			this.props.dispatch(showMenu('close'));
		} else {
			this.props.dispatch(showMenu('open'));
		}
	}

	render() {
		return (
			<ButtonComponent
			  classProp={`hide-for-large show-menu-mobile
			  	${this.props.showMenu}`}
			  id={'side-menu-toggle'}
			  name="Side Menu"
			  onClickProp={this.onItemClick.bind(this)}
			>
			<img className="filter-icon" src="/assets/img/icons/menu.svg"/>
			</ButtonComponent>
			)
	}
}

function mapStateToProps(state) {
  return {
    showMenu: state.showMenu.showMenu,
  }
}

export default connect(mapStateToProps)(SideMenuButton);