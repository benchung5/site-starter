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

		//update local state
		this.setState({ images: updatedImages });
		this.updateImages();

		//update dragreorder
		this.reInitDragReorder(this.state.images);
	},
	onCopyClick: function(item) {
		let desc = item.description ? 'alt="'+ item.description +'"' : '';
		let imgStr = '<img '+ desc  +' src="/uploads/' + this.refType + '/' + item.name + '" />';
		if(item.caption) {
			imgStr = '<figure>\n'+imgStr+'\n<figcaption>'+item.caption+'</figcaption>\n</figure>';
		}
		copyStringToClipboard(imgStr);
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

		//update parent
		this.hiddenFieldUpdatedImages.el.value = JSON.stringify(this.state.images);
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
			images: options.images
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
		inst.hiddenFieldUpdatedImages = FieldHidden.init({ name: 'updated_images'});
		inst.el.appendChild(inst.hiddenFieldUpdatedImages.el);
		
		inst.updateImages();

		//init dragreorder, must do this after initialize and image list has been added
		inst.initDragReorder(inst.state.images, inst.onReorder.bind(inst));

		return inst;
	}
}


export default UploadedImages;