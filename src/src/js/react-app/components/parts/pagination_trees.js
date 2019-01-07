import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globals } from '../../config.js';
import * as actions from '../../actions/globalTrees';

class PaginationTrees extends Component {
  updateSourceData() {

  }


  back() {
    const { offset, limit } = this.props.searchResults;
    if (offset === 0 ) { return; }
    this.props.dispatch(actions.searchTrees({ 
      //todo: get this.props.search to pull from stored search if any
      search: this.props.globalFilterData.search,
      categoriesTrees: this.props.globalFilterData.categoriesTrees,
      origins: this.props.globalFilterData.origins,
      offset: offset - globals.ADMIN_ENTRIES_PER_PAGE,
      limit: limit
    }));
  }

  advance() {
    const { offset, limit, count } = this.props.searchResults;
    if ((offset + limit) > count) { return; }
    this.props.dispatch(actions.searchTrees({
      //todo: get this.props.search to pull from stored search if any
      search: this.props.globalFilterData.search, 
      categoriesTrees: this.props.globalFilterData.categoriesTrees,
      origins: this.props.globalFilterData.origins,
      offset: offset + globals.ADMIN_ENTRIES_PER_PAGE,
      limit: limit
    }));
  }

  left() {
    const { offset } = this.props.searchResults;
    return (
      <div className={`paginate-previous ${offset === 0 ? 'disabled' : ''}`}>
        <a aria-label="Previous page" onClick={this.back.bind(this)}>
          Previous
        </a>
      </div>
    );
  }

  right() {
    const { offset, limit, count } = this.props.searchResults;
    const end = ((offset + limit) >= count) ? true : false;
    return (
      <div className={`paginate-next ${end ? 'disabled' : ''}`}>
        <a aria-label="Next page" onClick={this.advance.bind(this)}>
          Next
        </a>
      </div>
    );
  }

  render() {
    const { offset, count } = this.props.searchResults;
    return (
      <div className="paginate-wrapper">
        <div className="paginate" role="navigation" aria-label="Pagination">
          {this.left()}
          <div>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</div>
          {this.right()}
        </div>
        <div className="records-count">({count} records total)</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        searchResults: state.trees.searchResults,
        globalFilterData: state.globalTrees,
    };
}

export default connect(mapStateToProps)(PaginationTrees);