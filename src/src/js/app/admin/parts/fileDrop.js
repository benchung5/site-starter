import Component from '../../component';
import { addClass, removeClass } from '../../lib/utils';
import UpdateMessage from './updateMessage';

var FileDrop = {
	preventDefaults: function(e) {
	  e.preventDefault()
	  e.stopPropagation()
	},
	highlight: function(e) {
		addClass(this.el, 'highlight')
	},
	unhighlight: function(e) {
	  removeClass(this.el, 'highlight');
	},
	handleFiles: function(files) {
	  files = [...files]
	  files.forEach(this.callback.bind(this));
	},
	handleDrop: function(e) {
		this.updateMessage.clear();
		if (e.dataTransfer.items) {
		  // Use DataTransferItemList interface to access the file(s)
		  for (var i = 0; i < e.dataTransfer.items.length; i++) {
		    // If dropped items aren't files, reject them
		    if (e.dataTransfer.items[i].kind === 'file') {
		      var file = e.dataTransfer.items[i].getAsFile();
		      if ( /\.(jpe?g|png)$/i.test(file.name) ) {
		      	let dt = e.dataTransfer
		      	let files = dt.files
		      	this.handleFiles(files);
		      } else {
		      	this.updateMessage.renderError('Wrong file type');
		      }
		    }
		  }
		} else {
		  // Use DataTransfer interface to access the file(s)
		  for (var i = 0; i < e.dataTransfer.files.length; i++) {
		    if ( /\.(jpe?g|png)$/i.test(e.dataTransfer.files[i].name) ) {
		    	let dt = e.dataTransfer
		    	let files = dt.files
		    	this.handleFiles(files);
		    } else {
		    	this.updateMessage.renderError('Wrong file type');
		    }
		  }
		}

	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.callback = options.callback;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div id="drop-area" class="dropzone">
				<div className="instructions">
					Drop files here (Only jpeg and png images will be accepted).
				</div>
			</div>`
		});

		inst.updateMessage = UpdateMessage.init();
		inst.el.appendChild(inst.updateMessage.el);

		//add event listeners
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
		  inst.el.addEventListener(eventName, inst.preventDefaults.bind(inst), false)
		});
		['dragenter', 'dragover'].forEach(eventName => {
		  inst.el.addEventListener(eventName, inst.highlight.bind(inst), false)
		});
		['dragleave', 'drop'].forEach(eventName => {
		  inst.el.addEventListener(eventName, inst.unhighlight.bind(inst), false)
		})
		inst.el.addEventListener('drop', inst.handleDrop.bind(inst), false)

		return inst;
	}
}

export default FileDrop;