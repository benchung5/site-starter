import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addTree, addTreeError, clearTree } from '../../../actions/trees';
import { fetchTreeTables } from '../../../actions/treeTables';
import Sidebar from '../sidebar';
import renderField from '../parts/form_fields';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData } from '../../../lib/form_utils';
import { flattenObjArray } from '../../../lib/utils';
import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';

class AddTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // store the most recent value 
      // since theme turns to undefined after first form submit
      recentValue: ''
    }
  }

  componentWillMount() {
    this.props.fetchTreeTables();
  }

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('tree-add');
      //clear messages
      this.clearMessages();
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.treeAdded && (prevProps.treeAdded !== this.props.treeAdded)) {
      this.props.addTreeError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    this.clearMessages();
  }

  clearMessages() {
    this.props.clearTree();
    this.props.addTreeError('');
  }

  // if form isn't valit redux form will not call this function
  handleFormSubmit(formProps) {
    //format origins data (must convert it to comma separated string over the network)
    let formpropsClone = clone(formProps);
    formpropsClone.origins = flattenObjArray(formpropsClone.origins, 'value').toString();

    // call action to submit edited
    this.props.addTree(createImgFormData('images', formpropsClone));
  }


  renderAdded() {
    //only render if there's no error message
    if(this.props.treeAdded && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>Tree: {this.props.treeAdded.name}<br/>successfully added. </span>
        </div>
        )
    }
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        );
    }
  }

  onInputChange() {
      this.clearMessages();
  }

  // <Field
  //   type="textarea"
  //   label="body:"
  //   name="body"
  //   component={renderField}
  //   onChange={this.onInputChange.bind(this)}
  //   onFocus={this.onInputChange.bind(this)}
  // />
    
  render() {
      const { handleSubmit } = this.props;
      return (
        <div className="admin-main">
          <div className="row">
            <Sidebar/>
            <div className="columns small-12 large-9">
              <h3>Add Tree</h3>
              <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  label="common name"
                  name="common_name"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  label="slug"
                  name="slug"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  name="tree_category"
                  label="category"
                  component={renderDropdownSelect}
                  selectItems={this.props.treeTables.trees_category}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  name="origins"
                  label="origins"
                  defaultSelect={true}
                  component={renderMultiSelect}
                  selectItems={this.props.treeTables.origins}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  type="textarea"
                  label="body"
                  name="body"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <ImgFieldCrop
                  name="images"
                  classNameLabel="file-input-label"
                  onChange={this.onInputChange.bind(this)}
                />
                <button action="submit" className="btn btn-primary">Submit</button>
              </form>
              {this.renderAdded()}
              {this.renderError()}
            </div>
          </div>
        </div>
      );
  }

}


function validate(formProps) {
  const errors = {};

  //todo: use the map or foreach to shorten this code
  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  }

  if (!formProps.tree_category) {
    errors.category = 'Please enter a category';
  }

  if (formProps.origins) {
      if (formProps.origins.length === 0) {
          errors.origins = 'Please enter at least one origin';
      }
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    treeAdded: state.tree.treeAdded,
    errorMessage: state.tree.addTreeError,
    treeTables: state.treeTables.all,
  };
}


export default RequireAuth(reduxForm({
  validate,
  form: 'tree-add',
  fields: ['name', 'slug', 'files'],
  //fields: ['name', 'slug', 'body', 'files'],
})(
connect(mapStateToProps, { addTree, clearTree, addTreeError, fetchTreeTables, reset })(AddTree)
));


