import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globals } from '../../../config.js';

class Paginator extends Component {
  back() {
    const { offset, limit } = this.props.sourceData;
    if (offset === 0 ) { return; }
    //todo: get this.props.search to pull from stored search if any
    this.props.searchAction({ search: this.props.search, offset: offset - globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
  }

  advance() {
    const { offset, limit, count } = this.props.sourceData;
    if ((offset + limit) > count) { return; }
    //todo: get this.props.search to pull from stored search if any
    this.props.searchAction({ search: this.props.search, offset: offset + globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
  }

  left() {
    const { offset } = this.props.sourceData;
    return (
      <li className={`pagination-previous ${offset === 0 ? 'disabled' : ''}`}>
        <a aria-label="Previous page" onClick={this.back.bind(this)}>
          Previous
        </a>
      </li>
    );
  }

  right() {
    const { offset, limit, count } = this.props.sourceData;
    const end = ((offset + limit) >= count) ? true : false;
    return (
      <li className={`pagination-next ${end ? 'disabled' : ''}`}>
        <a aria-label="Next page" onClick={this.advance.bind(this)}>
          Next
        </a>
      </li>
    );
  }

  render() {
    const { offset, count } = this.props.sourceData;
    return (
      <div className="pagination-wrapper">
        <ul className="pagination" role="navigation" aria-label="Pagination">
          {this.left()}
          <li>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</li>
          {this.right()}
        </ul>
        <div className="records-count">({count} records total)</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        //articlesResults: state.articles.searchResultsAdmin
    };
}

export default connect(mapStateToProps)(Paginator);