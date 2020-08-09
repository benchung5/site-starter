import Component from '../../component';
import ImageEditMeta from './imageEditMeta';
import sanitizeFilename from 'sanitize-filename';

var Crop = {
	thumbWidth: 150,
	thumbHeight: 150,
	onUnmount: function() {
	  //do this to avoid memory leaks
	  window.URL.revokeObjectURL(this.file.preview);
	},
	validateFileName: function(fileName) {
	  //validate file name
	  let validatedName = sanitizeFilename(fileName);
	  //replace spaces with dashes
	  let spacesReplaced = validatedName.replace(/\ +/g, '-');
	  //remove these characters: ()';
	  let bracketsReplaced = spacesReplaced.replace(/(\(|\)|'|;)+/g, '');
	  //append date
	  // var date = new Date().getTime();
	  // let finalName = bracketsReplaced.replace(/(\.[\w\d_-]+)$/i, '-' + date + '$1');
	  let finalName = bracketsReplaced;

	  return finalName;
	},
	blobToFile: function(blob, fileName) {
	  //currently only works for chrome, ff and safari 10.1+
	  let file = new File([blob], this.validateFileName(fileName));
	  return file;
	},
	loadImage: function(file) {
	  this.file = file;
	  let reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onloadend = () => {
	  	let img = new Image();
	    img.src = reader.result;
	    img.onload = () => {
    	    this.ctx.drawImage(img,
    		    (img.naturalWidth - this.thumbWidth)/2, (img.naturalHeight - this.thumbHeight)/2, // x, y start from top left of image (crop),
    		    this.thumbWidth, this.thumbHeight, // w, h of image (crop),
    		    0, 0, // x, y start from top left of canvas for result image,
    		    this.thumbWidth, this.thumbHeight); // w, h of result image (scale)
	    }
	  }
	},
	submitCrop: function() {
		// if(window.navigator.msSaveBlob) {

		// } else {
		// 	this.canvas.toBlob((blob) => {

		// 	});
		// }

		this.canvas.toBlob((blob) => {
			
			const fileData = {
			  croppedFile: this.blobToFile(blob, this.file.name),
			  originalFile: this.file,
			  tag_id: this.state.meta.tag,
			  description: this.state.meta.description,
			}

			const previewData = this.canvas.toDataURL('image/jpeg')

			this.updateFiles(fileData, previewData);

			this.doneCrop();
			this.onUnmount();
		}, 'image/jpeg', 0.95);


	},
	doneCrop: function() {
		this.onUnmount();
		//callback
		this.onCropDone();
	},
	onMetaUpdated: function(meta) {
		this.setState({ meta: meta });
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//polyfill to <canvasElement>.toBlob for safari, ie
		if (!HTMLCanvasElement.prototype.toBlob) {
		 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
		  value: function (callback, type, quality) {

		    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
		        len = binStr.length,
		        arr = new Uint8Array(len);

		    for (var i = 0; i < len; i++ ) {
		     arr[i] = binStr.charCodeAt(i);
		    }

		    callback( new Blob( [arr], {type: type || 'image/jpeg'} ) );
		  }
		 });
		}

		inst.onCropDone = options.onCropDone;
		inst.updateFiles = options.onUpdateFiles;


		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="crop">
				<canvas id="canvas" width="${inst.thumbWidth}" height="${inst.thumbHeight}"></canvas>

				<div class="cropper-buttons">
				  <button id="crop" class="btn"}>crop</button>
				  <button id="cancel" class="btn">cancel</button>
				</div>
			</div>`
		});

		//get elements
		inst.cropperButtons = inst.el.querySelector('.cropper-buttons');
		inst.cropperButtons.querySelector('#crop').addEventListener('click', inst.submitCrop.bind(inst), false);
		inst.cropperButtons.querySelector('#cancel').addEventListener('click', inst.doneCrop.bind(inst), false);
		inst.imageEditMeta = ImageEditMeta.init({
			tags: options.tags,
			onUpdate: inst.onMetaUpdated.bind(inst)
		});
		inst.cropperButtons.before(inst.imageEditMeta.el);

		inst.canvas = inst.el.querySelector('#canvas');
		inst.canvas.style.width = this.thumbWidth;
		inst.canvas.style.height = this.thumbHeight;
		inst.ctx = inst.canvas.getContext('2d');

		return inst;
	}
}

export default Crop;