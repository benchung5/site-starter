import Component from '../component';

var MyComp = {
	// set state... this.setState({ myProp: false });
	// get state... this.state.myProp
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<button style="cursor: pointer; display: block;"></button>`
		});

		return inst;
	}
}

export default MyComp;