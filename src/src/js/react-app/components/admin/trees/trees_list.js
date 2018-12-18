import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/trees';
import RequireAuth from '../auth/require_auth';
import SearchTrees from './search_trees';
import Pagination from '../parts/pagination';
import settings from '../../../data/settings.js';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../../config')[env];

class TreesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.resetTreesList();
    }

    componentWillReceiveProps(nextProps) {
      // if newly navigated from the router link...
      if((nextProps.location !== this.props.location) && nextProps.location.key) {
        this.resetTreesList();
      }
    }

    resetTreesList() {
        this.props.searchTreesAdmin({ search: [], offset: 0, limit: settings.entriesPerPage });
    }

    onDeleteTreeClick(event) {
        let slug = event.target.getAttribute("data-slug");
        const { offset, limit } = this.props.trees;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.deleteTree(slug, [], offset, limit);
    }

    onDuplicateTreeClick(event) {
        let slug = event.target.getAttribute("data-slug");
        const { offset, limit } = this.props.trees;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.duplicateTree(slug, [], offset, limit);
    }
    
    renderTrees() {
        return this.props.trees.trees.map((tree) => {
            return (
                <li className="list-group-item" key={tree.id}>
                    <span>{tree.name}</span>
                    <a href="#" data-id={tree.id} data-slug={tree.slug} onClick={this.onDeleteTreeClick.bind(this)}>Delete</a>
                    <a href="#" data-id={tree.id} data-slug={tree.slug} onClick={this.onDuplicateTreeClick.bind(this)}>Duplicate</a>
                    <Link to={`/admin/trees-list/${tree.slug}`}>edit</Link>
                </li>
            );
        });
    }
    
    render() {
        return (
            <div className="admin-main">
                <div className="row">
                    <Sidebar/>
                    <div className="columns small-12 large-9">
                        <h3>Trees</h3>
                        <SearchTrees/>
                        <ul className="list-group item-list">
                            {this.renderTrees()}
                        </ul>
                        <Pagination/>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        trees: state.trees.searchResultsAdmin,
        treeDeleted: state.tree.treeDeleted,
    };
}

export default RequireAuth(connect(mapStateToProps, actions)(TreesIndex));