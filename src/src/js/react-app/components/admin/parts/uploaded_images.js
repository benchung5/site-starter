import React, { Component } from 'react';
import clone from 'lodash/clone';
import { imgName } from '../../../lib/stringUtils'
//config
const env = process.env.NODE_ENV || "development";
var { UPLOADS_PATH } = require('../../../config')[env];

class UploadedImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			deletedImages: []
		}
	}

	onDeleteClick(index) {
		//callback updated
		this.props.onChange();
		//remove image at index
		let updatedImages = clone(this.state.images);
		updatedImages.splice(index, 1);

		let deletedImages = clone(this.state.deletedImages);
		let imageDeleted = clone(this.state.images[index]);
		deletedImages.push(imageDeleted);

		//update local state
		this.setState({ images: updatedImages });
		this.setState({ deletedImages });

		//update parent
		this.props.updateImages(updatedImages, deletedImages);
	}

	initImages(images) {
		this.setState({ images: images }, () => {
			//sent initial state back to parent to avoid it 
			//being empty if one doesn't delete
			this.props.updateImages(images, []);
		});
	}

	renderImages() {
		return (
			<div className="drop-preview-wrapper">
				{this.state.images.map((item, index) => {
					return (
						<div key={index} className="drop-preview">
							<a href="#" className="close-btn" onClick={this.onDeleteClick.bind(this, index)}></a>
							<img className="drop-img-preview" src={UPLOADS_PATH + imgName(item, 'small')} />
						</div>
						
						)
				})}
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.renderImages()}
			</div>
		)
	}
}

export default UploadedImages;


