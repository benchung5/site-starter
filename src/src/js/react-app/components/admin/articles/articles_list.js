import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/articles';
import RequireAuth from '../auth/require_auth';
import SearchArticles from './search_articles';
import Pagination from '../parts/pagination';
import { globals } from '../../../config.js';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../../config')[env];

class ArticlesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.resetArticlesList();
    }

    componentWillReceiveProps(nextProps) {
      // if newly navigated from the router link...
      if((nextProps.location !== this.props.location) && nextProps.location.key) {
        this.resetArticlesList();
      }
    }

    resetArticlesList() {
        this.props.searchArticlesAdmin({ search: [], offset: 0, limit: globals.ADMIN_ENTRIES_PER_PAGE });
    }

    onDeleteArticleClick(event) {
        let slug = event.target.getAttribute("data-slug");
        const { offset, limit } = this.props.articles;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.deleteArticle(slug, [], offset, limit);
    }

    onDuplicateArticleClick(event) {
        let slug = event.target.getAttribute("data-slug");
        const { offset, limit } = this.props.articles;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.duplicateArticle(slug, [], offset, limit);
    }
    
    renderArticles() {
        return this.props.articles.articles.map((article) => {
            return (
                <li className="list-group-item" key={article.id}>
                    <span>{article.name}</span>
                    <a href="#" data-id={article.id} data-slug={article.slug} onClick={this.onDeleteArticleClick.bind(this)}>Delete</a>
                    <a href="#" data-id={article.id} data-slug={article.slug} onClick={this.onDuplicateArticleClick.bind(this)}>Duplicate</a>
                    <Link to={`/admin/articles-list/${article.slug}`}>edit</Link>
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
                        <h3>Articles</h3>
                        <SearchArticles/>
                        <ul className="list-group item-list">
                            {this.renderArticles()}
                        </ul>
                        <Pagination 
                            sourceData={this.props.articles} 
                            searchAction={this.props.searchArticlesAdmin.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        articles: state.articles.searchResultsAdmin,
        articleDeleted: state.article.articleDeleted,
    };
}

export default RequireAuth(connect(mapStateToProps, actions)(ArticlesIndex));