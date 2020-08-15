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
	update() {
		this.onUpdate({ 
			tag: this.state.tag_id,
			tagName: this.state.tag_name,
			description: this.state.description 
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
			`<div>
				<select className="dropdown-select" name="tag_id">
				 </select>

				<input type="text" placeholder="description" name="description"/>
			</div>`
		});

		// get elements
		inst.select = inst.el.querySelector('select');
		options.tags.map((item) => {
		  const option = inst.createEl(`<option key=${item.id} value=${item.id}>${item.name}</option>`);
		  inst.select.appendChild(option);
		});
		inst.select.addEventListener('change', inst.onTagChange.bind(inst), false);
		inst.input = inst.el.querySelector('input');
		inst.input.addEventListener('input', (e) => inst.onDescChange(e.target.value), false);
		//set an initial value
		inst.setState({ tag_id: options.tags[0].id });
		inst.setState({ description: '' });
		inst.update();
		
		return inst;
	}
}

export default ImageEditMeta;