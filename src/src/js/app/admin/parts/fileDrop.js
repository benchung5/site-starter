import Component from '../../component';
import { addClass, removeClass } from '../../lib/utils';

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
	  let dt = e.dataTransfer
	  let files = dt.files

	  this.handleFiles(files);
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
					Drop files here<br/>
					(Only jpeg images will be accepted)
				</div>
			</div>`
		});

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