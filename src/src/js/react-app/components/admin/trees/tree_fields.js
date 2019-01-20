import React, { Component } from 'react';
import { Field } from 'redux-form';
import renderField from '../parts/form_fields';
import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';
import renderHiddenField from '../parts/field_hidden';

class TreeFields extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
        <Field
            name="tree_id"
            component={renderHiddenField}
            value={this.props.treeId}
        />
        <Field
            type="input"
            label="common name"
            name="common_name"
            component={renderField}
            onChange={this.props.onInputChange}
            onFocus={this.props.onInputChange}
        />
        <Field
          label="slug"
          name="slug"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="genus_id"
          label="genus"
          component={renderDropdownSelect}
          selectItems={this.props.treeTables.genuses}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="specific epithet"
          name="specific_epithet"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="other species"
          name="other_species"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="subspecies"
          name="subspecies"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="variety"
          name="variety"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="cultivar"
          name="cultivar"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
            name="trees_category_id"
            label="category"
            component={renderDropdownSelect}
            selectItems={this.props.treeTables.trees_category}
            onChange={this.props.onInputChange}
            onFocus={this.props.onInputChange}
        />
        <Field
          label="zone"
          name="zone_id"
          component={renderDropdownSelect}
          selectItems={this.props.treeTables.zones}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="origins"
          label="origins"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.origins}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="regions"
          label="origin regions"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.regions}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="natural_habitat"
          label="natural habitat"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.natural_habitat}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="shapes"
          label="shapes"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.shapes}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="trunk_arrangements"
          label="trunk arrangements"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.trunk_arrangements}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="height min"
          name="height_min"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="height max"
          name="height_max"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="width min"
          name="width_min"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="width max"
          name="width_max"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="trunk diameter min"
          name="trunk_diameter_min"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="trunk diameter max"
          name="trunk_diameter_max"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="growth rate"
          name="growth_rate"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="lifespan min"
          name="lifespan_min"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          label="lifespan max"
          name="lifespan_max"
          component={renderField}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="bark"
          label="bark"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.bark}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="common_uses"
          label="common uses"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.common_uses}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="wood_uses"
          label="wood uses"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.wood_uses}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="unique_attractions"
          label="unique attractions"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.unique_attractions}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="tolerances"
          label="tolerances"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.tolerances}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="reproduction_type_id"
          label="reproduction types"
          component={renderDropdownSelect}
          selectItems={this.props.treeTables.reproduction_types}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="break_dormancy_by"
          label="break dormancy by"
          component={renderMultiSelect}
          selectItems={this.props.treeTables.break_dormancy_by}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
          name="conifer_leaf_type_id"
          label="conifer leaf type"
          component={renderDropdownSelect}
          selectItems={this.props.treeTables.conifer_leaf_types}
          onChange={this.props.onInputChange}
          onFocus={this.props.onInputChange}
        />
        <Field
            type="textarea"
            label="body"
            name="body"
            component={renderField}
            onChange={this.props.onInputChange}
            onFocus={this.props.onInputChange}
        />
        </div>
      );
  }

}

export default TreeFields;