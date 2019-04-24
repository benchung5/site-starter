import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/categories';
import RequireAuth from '../auth/require_auth';

class ThemeIndex extends Component {

	componentWillMount() {
		this.props.fetchcategories();
	}

	onDeleteThemeClick(event) {
		let slug = event.target.getAttribute('data-slug');
		this.props.deleteTheme({ slug });
	}

	rendercategories() {
		return this.props.categories.map((item, index) => {
			return (
				<li className="list-group-item" key={item.slug}>
				    <span>{item.name}</span>
				    <a href="#" data-id={item._id} data-slug={item.slug} onClick={this.onDeleteThemeClick.bind(this)}>Delete</a>
				    <Link to={`/admin/category-list/${item.slug}`}>edit</Link>
				</li>
				)
		});
	}

	render() {
		return (
			<div className="admin-main">
			<div className="row">
			    <Sidebar/>
			    <div className="columns small-12 large-9">
			        <h3>categories</h3>
			        <ul className="list-group item-list">
			            {this.rendercategories()}
			        </ul>
			    </div>
			</div>
			</div>
			)
	}

}

function mapStateToProps(state) {
	return {
		categories: state.categories.all,
		categoriesDeleted: state.theme.themeDeleted
	}
}

export default RequireAuth(connect(mapStateToProps, actions)(ThemeIndex));

