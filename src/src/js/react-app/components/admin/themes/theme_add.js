import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions/themes';
import Sidebar from '../sidebar';
import renderField from '../parts/form_fields';
import RequireAuth from '../auth/require_auth';

class AddTheme extends Component {

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('theme-add');
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.themeAdded && (prevProps.themeAdded !== this.props.themeAdded)) {
      this.props.addThemeError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    //by calling these actions
    this.props.addThemeError('');
    this.props.clearTheme();
  }

  // if form isn't valit redux form will not call this function
  handleFormSubmit(formProps) {
    // call action creator to add article
    this.props.addTheme(formProps);
  }

  renderAdded() {
    //only render if there's no error message
    if(this.props.themeAdded && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>theme: {this.props.themeAdded.title}<br/>successfully added.</span>
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
      this.props.clearTheme();
  }
    
  render() {
      const { handleSubmit } = this.props;
      return (
        <div className="admin-main">
          <div className="row">
            <Sidebar/>
            <div className="columns small-12 large-9">
              <h3>Add Theme</h3>
              <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  label="title:"
                  name="title"
                  component={renderField}
                  onChange={this.onInputChange.bind(this)}
                  onFocus={this.onInputChange.bind(this)}
                />
                <Field
                  label="title (fr):"
                  name="fr_title"
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
  if (!formProps.title) {
    errors.title = 'Please enter a title';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    themeAdded: state.theme.themeAdded,
    errorMessage: state.theme.addThemeError
  };
}


export default RequireAuth(reduxForm({
  validate,
  form: 'theme-add',
  fields: ['title', 'slug'],
})(
connect(mapStateToProps, actions)(AddTheme)
));



