import React, { Component } from 'react';

class DropdownSelect extends Component {

	handleChange(event) {
	  this.setState({value: event.target.value});
	}

	renderSelectOptions() {
		return this.props.selectItems.map((item) => {
			return <option key={item.slug} value={ item._id }>{ item.title }</option>
		});
	}

	render() {
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