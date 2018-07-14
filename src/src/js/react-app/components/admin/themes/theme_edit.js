import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import * as actions from '../../../actions/themes';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';
import RequireAuth from '../auth/require_auth';

class EditTheme extends Component {

    componentWillMount() {
        //get initial data to populate the form
        this.props.getTheme(this.props.match.params.themeId);
    }

    handleInitialize() {
        const formData = {
            "title": this.props.themeData.title,
            "fr_title": this.props.themeData.fr_title,
            //still must keep this for the id eventhough it isn't rendered
            "slug": this.props.themeData.slug
        };

        this.props.initialize(formData);
    }

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action to submit edited
        this.props.updateTheme(formProps);
    }

    renderUpdated() {
        if(this.props.themeUpdated) {
            return (
                <div>
                    <span>Theme: {this.props.themeUpdated.title}<br/>successfully updated.</span>
                </div>
            )
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.themeData && (prevProps.themeData !== this.props.themeData)) {
            this.handleInitialize();
        }
    }

    componentWillUnmount() {
      //clear messages when navigating away
      //by calling these actions
      this.props.clearUpdateTheme();
    }

    onInputChange() {
        this.props.clearUpdateTheme();
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="admin-main">
                <div className="row">
                    <Sidebar/>
                    <div className="columns small-12 large-9">
                        <h3>Edit Theme</h3>
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Field
                                type="input"
                                label="title:"
                                name="title"
                                component={renderField}
                                onChange={this.onInputChange.bind(this)}
                                onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                                type="input"
                                label="title (fr):"
                                name="fr_title"
                                component={renderField}
                                onChange={this.onInputChange.bind(this)}
                                onFocus={this.onInputChange.bind(this)}
                            />
                            <button action="submit" className="btn btn-primary">Submit</button>
                        </form>
                        {this.renderUpdated()}
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

    return errors;
}

function mapStateToProps(state, ownProps) {
    return { 
        themeUpdated: state.theme.themeUpdated,
        themeData: state.theme.themeSingle
    };
}

export default RequireAuth(reduxForm({
    validate,
    form: 'theme-add',
    fields: ['title', 'slug'],
})(
    connect(mapStateToProps, actions)(EditTheme)
    ));