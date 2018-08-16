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

	// componentWillMount() {
	// 	this.checkMenuOpen();
	// }

	// componentDidMount() {
	// 	window.addEventListener('resize', () => {
	// 		this.checkMenuOpen();
	// 	});
	// }

	// checkMenuOpen() {
	// 	//if on desktop, close open the side menu on load
	// 	if(window.innerWidth > globals.HIDE_MENU_THRESHOLD ) {
	// 		if ((this.props.showMenu === "close") || (this.props.showMenu === "")) {
	// 			this.props.dispatch(showMenu('open'));
	// 		}
	// 	} else {
	// 		if (this.props.showMenu === "open") {
	// 			this.props.dispatch(showMenu('close'));
	// 		}
	// 	}
	// }

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
			  classProp={`side-menu-btn
			  	${this.props.showMenu}`}
			  id={'side-menu-toggle'}
			  name="Side Menu"
			  onClickProp={this.onItemClick.bind(this)}
			>
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