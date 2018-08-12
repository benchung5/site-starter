import React, { Component } from 'react';
import { changeLanguage } from '../../actions/lang';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Socials extends Component {

	onLangClick(e) {
		if(this.props.lang === 'en') {
			this.props.changeLanguage('fr');
		} else {
			this.props.changeLanguage('en');
		}
	}

	render() {
		const {input, classProp } = this.props;

		return (
			<div className="socials">
				<a href="https://www.facebook.com/" target="_blank" className="social facebook"></a>
				<a href="https://twitter.com/" target="_blank" className="social twitter"></a>
				<a href="https://www.instagram.com/" target="_blank" className="social instagram"></a>
				<a className={`social ${this.props.lang}`} onClick={this.onLangClick.bind(this)}></a>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		lang: state.language.lang
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeLanguage: changeLanguage
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Socials);