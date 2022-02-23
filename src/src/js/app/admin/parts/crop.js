import Component from '../../component';
import ImageEditMeta from './imageEditMeta';
import sanitizeFilename from 'sanitize-filename';

var Crop = {
	// the the size the med thumbnail size will end up being
	// this is duplicated and resized again on the server to create the (sml) thumb size
	thumbSize: 200,
	onUnmount: function() {
	  //do this to avoid memory leaks
	  window.URL.revokeObjectURL(this.file.preview);
	},
	validateFileName: function(fileName) {
	  //validate file name
	  let validatedName = sanitizeFilename(fileName);
	  //replace spaces with dashes
	  let spacesReplaced = validatedName.replace(/\ +/g, '-');
	  //remove these characters: ()';,
	  let bracketsReplaced = spacesReplaced.replace(/(\(|\)|'|;|,)+/g, '');
	  //append date
	  // var date = new Date().getTime();
	  // let finalName = bracketsReplaced.replace(/(\.[\w\d_-]+)$/i, '-' + date + '$1');
	  let finalName = bracketsReplaced;

	  return finalName;
	},
	loadImage: function(file) {
	  this.fileName = this.validateFileName(file.name)

	  // //convert the original file to blob then back to file again so it can be stored in memory
	  // //otherwize if file is changed in the desktop the reference to it will be broken.
	  // file.arrayBuffer().then((arrayBuffer) => {
	  //     let blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
	  //     //currently only works for chrome, ff and safari 10.1+
	  //     let convertedFile = new File([blob], this.fileName, {type : 'image/jpeg'});
	  //     this.file = convertedFile;
	  // });

	  this.fileToCanvas(file, 875, true, (tempCanvas) => {
	  	this.tempOriginalCanvas = tempCanvas;
  	    //convert to blob (we've both resized the original file and prevented the reference from the 
  	    //original uploaded file from being broken by storing it in memory)
  		this.tempOriginalCanvas.toBlob((blob) => {
  			//currently only works for chrome, ff and safari 10.1+
  			this.file = new File([blob], this.fileName, {type : 'image/jpeg'});
  		}, 'image/jpeg', 0.95);
	  });

	  this.fileToCanvas(file, this.thumbSize, false, (tempCanvas) => {
	  	this.tempCropCanvas = tempCanvas;
	  	//draw temp canvas (for cropping) to the main canvas (draw as an image)
	  	this.canvas.width = tempCanvas.width;
	  	this.canvas.height = tempCanvas.height;
	  	this.ctx.drawImage(tempCanvas, 0, 0);

	    //draw a rectangle in the center of the image
	    this.rectXPos = (tempCanvas.width - this.thumbSize)/2;
		this.rectYPos = (tempCanvas.height - this.thumbSize)/2;
		this.drawRect();
	  });
	},
	fileToCanvas: function(file, maxSize, isLongestEdge, callback) {
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

	    	if(isLongestEdge) {
	    		//resize it to the maxSize on the longest edge
	    		if(img.naturalWidth > img.naturalHeight) {
	    			height = maxSize / widthAspect;
	    			width = maxSize;
	    		}

	    		if(img.naturalWidth < img.naturalHeight) {
	    			width = maxSize / heightAspect;
	    			height = maxSize;
	    		}
	    	} else {
	    		//resize it to the maxSize on the shortest edge
	    		if(img.naturalWidth > img.naturalHeight) {
	    			height = maxSize;
	    			width = maxSize*widthAspect
	    		}

	    		if(img.naturalWidth < img.naturalHeight) {
	    			width = maxSize;
	    			height = maxSize*heightAspect
	    		}
	    	}

	    	//if image is already square
	    	if(img.naturalWidth == img.naturalHeight) {
	    		width = maxSize;
	    		height = maxSize;
	    	}

	    	//create a temporary canvas to create the resized image
	    	let tempCanvas = document.createElement('canvas');
	    	tempCanvas.width = width;
	    	tempCanvas.height = height;
	    	var tempCtx = tempCanvas.getContext('2d');

    	    tempCtx.drawImage(img,
    		    0, 0, // x, y start from top left of image (source),
    		    img.naturalWidth, img.naturalHeight, // w, h of image (source),
    		    0, 0, // x, y start from top left of canvas for result image,
    		    width, height // w, h of result image (scale)
				);

    	    callback(tempCanvas);
	    }
	  }
	},
	drawRect: function() {
		this.ctx.beginPath();
		this.ctx.rect(this.rectXPos, this.rectYPos, this.thumbSize, this.thumbSize);
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
		this.canvas.width = this.thumbSize;
		this.canvas.height = this.thumbSize;

		//crop the portion of the image inside the box and draw
		//let tempCanvas = document.createElement('canvas');
	    this.ctx.drawImage(this.tempCropCanvas,
		    this.rectXPos, this.rectYPos, // x, y start from top left of image (crop),
		    this.thumbSize, this.thumbSize, // w, h of image (crop),
		    0, 0, // x, y start from top left of canvas for result image,
		    this.thumbSize, this.thumbSize // w, h of result image (scale)
			);

	    //convert to blob and output file data and preview
		this.canvas.toBlob((blob) => {
			const fileName = this.fileName;

			//currently only works for chrome, ff and safari 10.1+
			let file = new File([blob], fileName, {type : 'image/jpeg'});

			const fileData = {
			  croppedFile: file,
			  originalFile: this.file,
			  //originalFile: this.validateFileName(fileName),
			  tag_id: this.state.meta.tag,
			  description: this.state.meta.description,
			  caption: this.state.meta.caption
			}

			const previewData = {
				dataUrl: this.canvas.toDataURL('image/jpeg'),
				name: fileName,
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
				<div class="verify-action">
				  <div class="buttons">
				   <button id="crop" class="btn"}>crop</button>
				   <button id="cancel" class="btn">cancel</button>
				  </div>
				</div>
			</div>`
		});

		//get elements
		inst.cropperButtons = inst.el.querySelector('.verify-action');
		inst.cropperButtons.querySelector('#crop').addEventListener('click', inst.submitCrop.bind(inst), false);
		inst.cropperButtons.querySelector('#cancel').addEventListener('click', inst.doneCrop.bind(inst), false);
		inst.imageEditMeta = ImageEditMeta.init({
			tags: options.tags,
			onUpdate: inst.onMetaUpdated.bind(inst)
		});
		inst.cropperButtons.before(inst.imageEditMeta.el);

		inst.canvas = inst.el.querySelector('#canvas');
		inst.canvas.style.height = this.thumbSize;
		inst.ctx = inst.canvas.getContext('2d');

		return inst;
	}
}

export default Crop;