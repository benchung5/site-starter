import Component from '../../component';
import FileDrop from './fileDrop';
import Modal from '../../parts/modal';
import Crop from './crop';
import cloneDeep from 'lodash/cloneDeep';

var FieldAddImages = {
	onFileDrop: function(file) {
		this.crop.loadImage(file);
		this.modal.open();
	},
	onCropDone: function() {
		this.modal.close();
	},
	onDeleteClick: function(index) {
	  //remove it from accepted at it's index
	  let croppedOut = cloneDeep(this.state.croppedOut);
	  croppedOut.splice(index, 1);
	  this.setState({ croppedOut: croppedOut });

	  //update the previews
	  let previews = cloneDeep(this.state.previews);
	  previews.splice(index, 1);
	  this.setState({ previews: previews });

	  this.updatePreview();
	},
	onUpdateFiles: function(fileData, preview) {
		//output updated files
		let croppedOut = cloneDeep(this.state.croppedOut);
		croppedOut.push(fileData);
		this.setState({ croppedOut: croppedOut });
		
		//output images preview
		let previews = cloneDeep(this.state.previews);
		previews.push(preview);
		this.setState({previews: previews});

		this.updatePreview();
	},
	updatePreview: function() {
		// clear drop preview first
		this.dropPreview.innerHTML = '';
		this.state.croppedOut.map((item, index) => {
			const dropPreviewImage = this.createEl(`
				<div class="drop-preview">
					<div data-id="${item.croppedFile.name}" class="close-btn"></div>
					<img class="drop-img-preview" src=${this.state.previews[index].dataUrl} />
					<div class="desc">
					  ${this.state.previews[index].name}
					  <br/>
					  ${this.state.previews[index].tagName && 'tag: ' + this.state.previews[index].tagName}
					  <br/>
					  ${item.description && 'description: ' + item.description} 
					</div>
				</div>
				`);
			dropPreviewImage.querySelector('.close-btn').addEventListener('click', this.onDeleteClick.bind(this, index), false);

			this.dropPreview.appendChild(dropPreviewImage);
		});
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.tags = options.tags;
		inst.setState({ croppedOut: [] });
		inst.setState({ previews: [] });

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div>
			</div>`
		});

		inst.fileDrop = FileDrop.init({ callback: inst.onFileDrop.bind(inst) });
		inst.el.appendChild(inst.fileDrop.el);
		inst.dropPreview = inst.createEl(`<div class="drop-preview-wrapper"></div>`);
		inst.el.appendChild(inst.dropPreview);

		inst.crop = Crop.init({ 
			tags: options.tags, 
			onCropDone: inst.onCropDone.bind(inst),
			onUpdateFiles: inst.onUpdateFiles.bind(inst)
		});
		inst.modal = Modal.init({ contentElement: inst.crop.el });

		return inst;
	}
}

export default FieldAddImages;