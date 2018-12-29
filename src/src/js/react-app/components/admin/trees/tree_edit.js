import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { getTree, clearUpdateTree, updateTree } from '../../../actions/trees';
import { fetchTreeTables } from '../../../actions/treeTables';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';
import renderHiddenField from '../parts/field_hidden';
import UploadedImages from '../parts/uploaded_images';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData } from '../../../lib/form_utils';
import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';
import { flattenObjArray } from '../../../lib/utils';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';


class EditTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imagesToDelete: [],
            selectedItem: ''
        }
    }

    componentWillMount() {
        this.props.fetchTreeTables();
        //get initial data to populate the form
        this.props.getTree(this.props.match.params.treeId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.treeData && (prevProps.treeData !== this.props.treeData)) {
            this.handleInitialize();
        }
    }

    componentWillUnmount() {
      //clear messages when navigating away
      this.clearMessages();
    }

    clearMessages() {
      this.props.clearUpdateTree();
    }

    handleInitialize() {

        //convert to an array
        let images = [];
        Object.keys(this.props.treeData.images).forEach((key) => {
            images[key] = this.props.treeData.images[key].name;
        })
        //store initial images for comparison later
        this.setState({ images });
        //init images on UploadedImages component
        this.refs.UploadedImages.initImages(images, 'trees');

        let originsArray = this.formatToMultiselect(this.props.treeData.origins);

        const formData = {
            'common_name': this.props.treeData.common_name,
            'slug': this.props.treeData.slug,
            'body': this.props.treeData.body,
            //still must keep this for the id eventhough it isn't rendered
            'tree_category': this.props.treeData.trees_category_id,
            'origins': originsArray,
        };

        this.props.initialize(formData);
    }

    // if form isn't valid redux form will not call this function
    handleFormSubmit(formProps) {
        //format origins data (must convert it to comma separated string over the network)
        let formpropsClone = clone(formProps);
        formpropsClone.origins = flattenObjArray(formpropsClone.origins, 'value').toString();

        // call action to submit edited
        this.props.updateTree(createImgFormData('new_images', formpropsClone));
        //clear deleted images
        this.props.change('deleted_images', '');
    }

    formatToMultiselect(inArray) {
        return inArray.map((item) => {
            return { value: item.id, label: item.name }
        });
    }

    renderUpdated() {
        if(this.props.treeUpdated) {
            return (
                <div className="submission-message">
                    <span>Tree: {this.props.treeUpdated.common_name}<br/>successfully updated.</span>
                </div>
            )
        }
    }

    updatedImages(images, deletedImages) {
        // update deleted_images field with the deleted images in string form
        this.props.change('deleted_images', deletedImages.toString());

        // update updated_images field with the upated images in string form
        this.props.change('updated_images', images.toString());
    }

    onInputChange() {
        this.clearMessages();
    }
    
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="admin-main">
                <div className="row">
                    <Sidebar/>
                    <div className="columns small-12 large-9">
                        <h3>Edit Tree</h3>

                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Field
                                type="input"
                                label="common name"
                                name="common_name"
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
                            <UploadedImages
                                ref="UploadedImages"
                                updateImages={this.updatedImages.bind(this)}
                                onChange={this.onInputChange.bind(this)}
                            />
                            <Field
                                name="deleted_images"
                                component={renderHiddenField}
                            />
                            <Field
                                name="updated_images"
                                component={renderHiddenField}
                            />
                            <ImgFieldCrop
                                name="new_images"
                                label="New Images"
                                classNameLabel="file-input-label"
                                onChange={this.onInputChange.bind(this)}
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
    if (!formProps.common_name) {
        errors.common_name = 'Please enter a common name';
    }

    if (!formProps.slug) {
        errors.slug = 'Please enter a slug';
    }

    if (!formProps.tree_category) {
      errors.tree_category = 'Please enter a category';
    }

    if (formProps.origins) {
        if (formProps.origins.length === 0) {
            errors.origins = 'Please enter at least one origin';
        }
    }
    
    return errors;
}

function mapStateToProps(state, ownProps) {
    return { 
        treeUpdated: state.tree.treeUpdated,
        treeData: state.tree.treeSingle,
        treeTables: state.treeTables.all,
    };
}

export default RequireAuth(reduxForm({
    validate,
    form: 'tree-add',
    fields: ['common_name', 'slug', 'body'],
})(
    connect(mapStateToProps, { getTree, clearUpdateTree, updateTree, fetchTreeTables })(EditTree)
    ));



