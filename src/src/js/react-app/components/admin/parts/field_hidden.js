import React from 'react';

function renderHiddenField(field) {
	return (
		<input type="hidden" className="form-control" {...field.input} />
		)
}

export default renderHiddenField;

// import React, { Component } from 'react';
// import { Field } from 'redux-form';

// class DeletedImagesField extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			// images: []
// 		}
// 	}

// 	// updateImages(images) {
// 	// 	this.setState({ images: images });
// 	// }

// 	render() {
// 		return (
// 			<input type="hidden" className="form-control" value={this.props.imagesToDelete}/>
// 			)
// 	}
// }

// export default (props) => {
// 	return <Field component={DeletedImagesField} {...props} />
// }


