import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/trees';
import settings from '../../../data/settings.js';

class Paginator extends Component {
  back() {
    const { offset, limit } = this.props.treesResults;
    if (offset === 0 ) { return; }
    //todo: get this.props.search to pull from stored search if any
    this.props.searchTreesAdmin({ search: this.props.search, offset: offset - settings.entriesPerPage, limit: limit });
  }

  advance() {
    const { offset, limit, count } = this.props.treesResults;
    if ((offset + limit) > count) { return; }
    //todo: get this.props.search to pull from stored search if any
    this.props.searchTreesAdmin({ search: this.props.search, offset: offset + settings.entriesPerPage, limit: limit });
  }

  left() {
    const { offset } = this.props.treesResults;
    return (
      <li className={`pagination-previous ${offset === 0 ? 'disabled' : ''}`}>
        <a aria-label="Previous page" onClick={this.back.bind(this)}>
          Previous
        </a>
      </li>
    );
  }

  right() {
    const { offset, limit, count } = this.props.treesResults;
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
    const { offset, count } = this.props.treesResults;
    return (
      <div className="pagination-wrapper">
        <ul className="pagination" role="navigation" aria-label="Pagination">
          {this.left()}
          <li>Page {offset / settings.entriesPerPage + 1}</li>
          {this.right()}
        </ul>
        <div className="records-count">({count} records total)</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        treesResults: state.trees.searchResultsAdmin
    };
}

export default connect(mapStateToProps, actions)(Paginator);