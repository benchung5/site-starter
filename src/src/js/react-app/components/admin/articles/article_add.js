import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addArticle, addArticleError, clearArticle } from '../../../actions/articles';
import { fetchCategories } from '../../../actions/categories';
import { fetchTags } from '../../../actions/tags';
import Sidebar from '../sidebar';
import renderField from '../parts/form_fields';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData } from '../../../lib/form_utils';
import { flattenObjArray } from '../../../lib/utils';
import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';

class AddArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // store the most recent value 
      // since category turns to undefined after first form submit
      recentValue: ''
    }
  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchTags();
  }

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('article-add');
      //clear messages
      this.clearMessages();
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.articleAdded && (prevProps.articleAdded !== this.props.articleAdded)) {
      this.props.addArticleError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    this.clearMessages();
  }

  clearMessages() {
    this.props.clearArticle();
    this.props.addArticleError('');
  }

  // if form isn't valit redux form will not call this function
  handleFormSubmit(formProps) {
    //format categories data (must convert it to comma separated string over the network)
    let formpropsClone = clone(formProps);
    formpropsClone.categories = flattenObjArray(formpropsClone.categories, 'value').toString();

    // call action to submit edited
    this.props.addArticle(createImgFormData('images', formpropsClone));
  }


  renderAdded() {
    //only render if there's no error message
    if(this.props.articleAdded && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>Article: {this.props.articleAdded.name}<br/>successfully added. </span>
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
              <h3>Add Article</h3>
              <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  label="name:"
                  name="name"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  label="slug:"
                  name="slug"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  name="categories"
                  label="categories"
                  component={renderMultiSelect}
                  selectItems={this.props.categories}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  name="tags"
                  label="tags"
                  defaultSelect={true}
                  component={renderMultiSelect}
                  selectItems={this.props.tags}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <ImgFieldCrop
                  name="images"
                  classNameLabel="file-input-label"
                  onChange={this.onInputChange.bind(this)}
                  tags={[{id: "1", name: "test tag"}]}
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

  if (!formProps.category) {
    errors.category = 'Please enter a category';
  }

  if (!formProps.categories) {
    errors.categories = 'Please enter at least one category';
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    articleAdded: state.article.articleAdded,
    errorMessage: state.article.addArticleError,
    categories: state.categories.all,
    tags: state.tags.all,
  };
}


export default RequireAuth(reduxForm({
  validate,
  form: 'article-add',
  fields: ['name', 'slug', 'files'],
  //fields: ['name', 'slug', 'body', 'files'],
})(
connect(mapStateToProps, { addArticle, clearArticle, addArticleError, fetchCategories, fetchTags, reset })(AddArticle)
));



