import { imgName, copyStringToClipboard } from '../../lib/stringUtils';
import Component from '../../component';
import DragReorder from './dragReorder';
import FieldHidden from './fieldHidden';
import { clone } from '../../lib/utils';

var UploadedImages = {
	onDeleteClick: function(index) {
		//callback updated
		this.onChange();
		//remove image at index
		let updatedImages = clone(this.state.images);
		updatedImages.splice(index, 1);

		let deletedImages = clone(this.state.deletedImages);
		let imageDeleted =  clone(this.state.images[index]);
		deletedImages.push(imageDeleted);

		//update local state
		this.setState({ images: updatedImages });
		this.setState({ deletedImages });
		this.updateImages();

		//update parent
		this.updateHiddenFields(deletedImages);

		//update dragreorder
		this.reInitDragReorder(this.state.images);
	},
	reset: function() {
		this.setState({ deletedImages: [] });
		this.hiddenFieldDeletedImages.el.value = '';
	},
	onCopyClick: function(item) {
		let imgStr = '<img alt="' + item.description + '" src="/uploads/' + this.refType + '/' + item.name + '" />';
		copyStringToClipboard(imgStr);
	},
	updateHiddenFields: function(deletedImages) {
		let delImages = [];
		Object.keys(deletedImages).forEach((key) => {
		    delImages[key] = deletedImages[key].name;
		})
		this.hiddenFieldDeletedImages.el.value = delImages.toString();
		//this.hiddenFieldImages.el.value = JSON.stringify(images);
	},
	updateImages: function() {
		// clear drop preview first
		this.dropPreview.innerHTML = '';
		this.state.images.map((item, index) => {
			const dropPreviewImage = this.createEl(`
				<div class="drop-preview draggable" draggable="true" data-index="${index}">
					<div class="close-btn"></div>
					<button class="copy-btn">copy</button>
					<img class="drop-img-preview" src=${'/uploads/' + this.refType + '/' + imgName(item.name, 'small')} />
					<div class="desc">
					  ${item.name}
					  <br/>
					  ${item.tag_name && 'tag name: ' + item.tag_name}
					  <br/>
					  ${item.description && 'description: ' + item.description}
					</div>
				</div>
				`);
			dropPreviewImage.querySelector('.close-btn').addEventListener('click', this.onDeleteClick.bind(this, index), false);
			dropPreviewImage.querySelector('.copy-btn').addEventListener('click', this.onCopyClick.bind(this, item), false);

			this.dropPreview.appendChild(dropPreviewImage);
		});
	},
	onReorder: function(updatedState) {
		this.setState({ images: updatedState });
		this.updateImages();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component, DragReorder);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.onChange = options.onChange;

		//set initial state
		inst.refType = options.refType;
		inst.setState({ 
			images: options.images, 
			deletedImages: [] 
		});

		//call initialize on Component first
		inst.initialize({
			el: `<div>
					<div class="drop-preview-wrapper draggable-container">
					</div>
				</div>`
		});

		inst.dropPreview = inst.el.querySelector('.drop-preview-wrapper');
		//inst.hiddenFieldImages = FieldHidden.init({ name: 'images'});
		//inst.el.appendChild(inst.hiddenFieldImages.el);
		inst.hiddenFieldDeletedImages = FieldHidden.init({ name: 'deleted_images'});
		inst.el.appendChild(inst.hiddenFieldDeletedImages.el);
		

		inst.updateImages();

		//init dragreorder, must do this after initialize and image list has been added
		inst.initDragReorder(inst.state.images, inst.onReorder.bind(inst));

		return inst;
	}
}


export default UploadedImages;