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
	    	const widthAspect = img.naturalWidth / img.naturalHeight;
	    	const heightAspect = img.naturalHeight / img.naturalWidth;
	    	let height = 0;
	    	let width = 0;

	    	if(img.naturalWidth > img.naturalHeight) {
	    		height = this.thumbHeight;
	    		width = this.thumbWidth*widthAspect
	    	}

	    	if(img.naturalWidth < img.naturalHeight) {
	    		width = this.thumbWidth;
	    		height = this.thumbHeight*heightAspect
	    	}

	    	//create a temporary canvas to create the resized image
	    	this.tempCanvas = document.createElement('canvas');
	    	this.tempCanvas.width = width;
	    	this.tempCanvas.height = height;
	    	var tempCtx = this.tempCanvas.getContext('2d');

    	    tempCtx.drawImage(img,
    		    0, 0, // x, y start from top left of image (crop),
    		    img.naturalWidth, img.naturalHeight, // w, h of image (crop),
    		    0, 0, // x, y start from top left of canvas for result image,
    		    width, height // w, h of result image (scale)
				);


    	    //draw temp canvas to the main canvas (draw as an image)
    	    this.canvas.width = width;
    	    this.canvas.height = height;
    	    this.ctx.drawImage(this.tempCanvas, 0, 0);

    	    //draw a rectangle in the center of the image
    	    this.rectXPos = (width - this.thumbWidth)/2;
			this.rectYPos = (height - this.thumbHeight)/2;
			this.drawRect();
	    }
	  }
	},
	drawRect: function() {
		this.ctx.beginPath();
		this.ctx.rect(this.rectXPos, this.rectYPos, this.thumbWidth, this.thumbHeight);
		this.ctx.stroke();
	},
	submitCrop: function() {
		// if(window.navigator.msSaveBlob) {

		// } else {
		// 	this.canvas.toBlob((blob) => {

		// 	});
		// }

		//clear canvas and set it's width and height to finished crop dimensions
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.canvas.width = this.thumbWidth;
		this.canvas.height = this.thumbHeight;

		//crop the portion of the image inside the box and draw
	    this.ctx.drawImage(this.tempCanvas,
		    this.rectXPos, this.rectYPos, // x, y start from top left of image (crop),
		    this.thumbWidth, this.thumbHeight, // w, h of image (crop),
		    0, 0, // x, y start from top left of canvas for result image,
		    this.thumbWidth, this.thumbHeight // w, h of result image (scale)
			);

	    //convert to blob and output file data and preview
		this.canvas.toBlob((blob) => {
			const fileData = {
			  croppedFile: this.blobToFile(blob, this.file.name),
			  originalFile: this.file,
			  tag_id: this.state.meta.tag,
			  description: this.state.meta.description,
			}

			const previewData = {
				dataUrl: this.canvas.toDataURL('image/jpeg'),
				name: this.file.name,
				tagName: this.state.meta.tagName,
			}

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
		//end polyfill

		inst.onCropDone = options.onCropDone;
		inst.updateFiles = options.onUpdateFiles;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="crop">
				<canvas id="canvas"></canvas>

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
		// inst.canvas.style.maxWidth = '400px';
		// inst.canvas.style.maxheight = '400px';
		inst.canvas.style.height = this.thumbHeight;
		inst.ctx = inst.canvas.getContext('2d');

		return inst;
	}
}

export default Crop;