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
import { createImgFormData, formatOutMultiselects } from '../../../lib/form_utils';
import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';
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
        let images = clone(this.props.treeData.images);

        //store initial images for comparison later
        this.setState({ images });
        //init images on UploadedImages component
        this.refs.UploadedImages.initImages(images, 'trees');

        const formData = {
            'common_name': this.props.treeData.common_name,
            'slug': this.props.treeData.slug,
            'specific_epithet': this.props.treeData.specific_epithet,
            'other_species': this.props.treeData.other_species,
            'subspecies': this.props.treeData.subspecies,
            'variety': this.props.treeData.variety,
            'cultivar': this.props.treeData.cultivar,
            'body': this.props.treeData.body,
            //still must keep this for the id eventhough it isn't rendered
            'genus_id': this.props.treeData.genus_id,
            'trees_category_id': this.props.treeData.trees_category_id,
            'zone_id': this.props.treeData.zone_id,
            'origins': this.formatToMultiselect(this.props.treeData.origins),
            'regions': this.formatToMultiselect(this.props.treeData.regions),
            'shapes': this.formatToMultiselect(this.props.treeData.shapes),
            'trunk_arrangements': this.formatToMultiselect(this.props.treeData.trunk_arrangements),
            'bark': this.formatToMultiselect(this.props.treeData.bark),
        };

        this.props.initialize(formData);
    }

    // if form isn't valid redux form will not call this function
    handleFormSubmit(formProps) {
        let formpropsClone = [];
        formpropsClone = formatOutMultiselects(formProps, ['origins', 'regions', 'shapes', 'trunk_arrangements', 'bark']);

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
        let delImages = [];
        Object.keys(deletedImages).forEach((key) => {
            delImages[key] = deletedImages[key].name;
        })
        this.props.change('deleted_images', delImages.toString());

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
                              name="genus_id"
                              label="genus"
                              component={renderDropdownSelect}
                              selectItems={this.props.treeTables.genuses}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="specific epithet"
                              name="specific_epithet"
                              component={renderField}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="other species"
                              name="other_species"
                              component={renderField}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="subspecies"
                              name="subspecies"
                              component={renderField}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="variety"
                              name="variety"
                              component={renderField}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="cultivar"
                              name="cultivar"
                              component={renderField}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                                name="trees_category_id"
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
                              name="regions"
                              label="origin regions"
                              component={renderMultiSelect}
                              selectItems={this.props.treeTables.regions}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              label="zone"
                              name="zone_id"
                              component={renderDropdownSelect}
                              selectItems={this.props.treeTables.zones}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              name="shapes"
                              label="shapes"
                              component={renderMultiSelect}
                              selectItems={this.props.treeTables.shapes}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              name="trunk_arrangements"
                              label="trunk arrangements"
                              component={renderMultiSelect}
                              selectItems={this.props.treeTables.trunk_arrangements}
                              onChange={this.onInputChange.bind(this)}
                              onFocus={this.onInputChange.bind(this)}
                            />
                            <Field
                              name="bark"
                              label="bark"
                              component={renderMultiSelect}
                              selectItems={this.props.treeTables.bark}
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
                                tags={this.props.treeTables.tags}
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

    // if (!formProps.trees_category_id) {
    //   errors.trees_category_id = 'Please enter a category';
    // }

    // if (formProps.origins) {
    //     if (formProps.origins.length === 0) {
    //         errors.origins = 'Please enter at least one origin';
    //     }
    // }
    
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



