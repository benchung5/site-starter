import Component from '../../component';

var ImageEditMeta = {
	onTagChange: function(e) {
		this.setState({tag_id: e.target.value});
		this.setState({tag_name: e.target.options[e.target.selectedIndex].text});
		this.update();
	},
	onDescChange(inputValue) {
	    this.setState({description: inputValue});
	    this.update();
	},
	onCaptionChange(inputValue) {
	    this.setState({caption: inputValue});
	    this.update();
	},
	update() {
		this.onUpdate({ 
			tag: this.state.tag_id,
			tagName: this.state.tag_name,
			description: this.state.description,
			caption: this.state.caption
		});
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.onUpdate = options.onUpdate;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="img-edit-meta">
				<select class="dropdown-select" name="tag_id">
				<input id="description" type="text" placeholder="description" name="description"/>
				<input id="caption" type="text" placeholder="caption" name="caption"/>
			</div>`
		});

		// get elements
		inst.select = inst.el.querySelector('select');
		options.tags.map((item) => {
		  const option = inst.createEl(`<option key=${item.id} value=${item.id}>${item.name}</option>`);
		  inst.select.appendChild(option);
		});
		inst.select.addEventListener('change', inst.onTagChange.bind(inst), false);

		inst.description = inst.el.querySelector('#description');
		inst.description.addEventListener('input', (e) => inst.onDescChange(e.target.value), false);

		inst.caption = inst.el.querySelector('#caption');
		inst.caption.addEventListener('input', (e) => inst.onCaptionChange(e.target.value), false);
		//set an initial value
		inst.setState({ tag_id: options.tags[0].id });
		inst.setState({tag_name: inst.select.options[0].text});
		inst.setState({ description: '' });
		inst.setState({ caption: '' });
		inst.update();
		
		return inst;
	}
}

export default ImageEditMeta;