//temporary fix component is a duplicate of dropdown_select except the valu is item.name instead of item.id
//had to do this because in this version of redux form youo can't access the form field's component with custom props :(

import React, { Component } from 'react';

class DropdownSelect extends Component {

	handleChange(event) {
	  this.setState({value: event.target.value});
	}

	renderSelectOptions() {
		return this.props.selectItems.map((item) => {
			return <option key={item.id} value={ item.name }>{ item.name }</option>
		});
	}

	render() {
		console.log(this.props.customProps);
		const { meta: { touched, error }, input, label } = this.props;
		return (
			<div className="form-group">
				<label htmlFor={label}>{label}</label>
				<select className="dropdown-select" value={ input.value } onChange={this.handleChange} {...input} >
					{this.renderSelectOptions()}
				</select>
				<div className="error">
				  {touched ? error : ''}
				</div>
			</div>
			)
	}
}

export default DropdownSelect;