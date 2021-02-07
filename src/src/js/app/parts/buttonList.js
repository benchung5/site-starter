import Component from '../component';
import Button from './button';

var ButtonList = {
	onItemClick: function(e) {
		e.preventDefault();
		let id = e.target.getAttribute('data-id');
		
	    let modifiedData = this.buttonData.map((item, index) => {

	    	//set current active to the opposite of what it was (toggle);
	    	if (item.id === id) {
	    		this.updateButtonState(id, (!item.active));
	    		return Object.assign(item, { active: !item.active });
	    	} else {
	    		return item;
	    	}
	    });
	    //send callback
	    this.updateData(modifiedData);
	},
	updateButtonState: function(id, isActive) {
		
		// update the button state
		const el = this.el.querySelector(`[data-id="${id}"]`);
		el.dataset.isActive = isActive;
	},
	buildButtons: function() {
		this.buttonData.map((item, index) => {
			const children = this.createEl(`
					<div>
				    	<i class="fas fa-${item.icon}"></i>
				    	<div class='check'></div>
					    <span data-id="${item.id}" class="name">${item.name}</span>
					</div>
				`);

			const button = Button.init({
				className: `${this.classPropButton} ${item.slug}`,
				style: `height: ${this.buttonHeight}px`,
				isActive: item.active || this.allActive,
				id: item.id,
				name: item.name,
				onClick: this.onItemClick.bind(this),
				children: children
			});

			const wrapper = this.createEl(
				`<div  class="${this.wrapperClass}"></div>`
				);

			wrapper.appendChild(button.el);
			this.el.appendChild(wrapper);
			this.updateButtonState(item.id, item.active);

			// // if url contains selected categories, just select those
			// let selectedCategories = getUrlParams('categories');
			// let isActive = true;
   //          if (selectedCategories) {
   //              isActive = false;
   //              if ((selectedCategories.length > 0) && (selectedCategories.indexOf(item.slug) > -1)) {
   //                  isActive = true;
   //              }
   //              this.updateButtonState(item.id, isActive);
   //          }
			// return Object.assign(item, { active: isActive });
		});

		// console.log(modifiedData);

		// //send initial callback
		// this.updateData(modifiedData);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.buttonData = options.buttonData;
		inst.wrapperClass = options.wrapperClass;
		inst.classPropButton = options.classPropButton;
		inst.buttonHeight = options.buttonHeight;
		inst.updateData = options.updateData;
		inst.allActive = options.allActive;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="button-list ${options.className}"></div>`
		});

		inst.buildButtons();

		return inst;
	}
}

export default ButtonList;