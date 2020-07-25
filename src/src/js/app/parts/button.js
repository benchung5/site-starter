import Component from '../component';

var Button = {
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: `<button style="cursor: pointer; display: block;"></button>`
		});

		inst.el.addEventListener('click', (e) => {
			inst.setState({currentButton: e.target.innerHTML});
		}, false);

		return inst;
	}
}

export default Button;