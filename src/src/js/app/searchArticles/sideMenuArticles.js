import Component from '../component';
import SideMenuArticlesContent from './sideMenuArticlesContent';

var SideMenuArticlesMobile = {
	init: function() {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			`<div class="side-menu">
            </div>`
		});

		inst.sideMenuArticlesContent = SideMenuArticlesContent.init({});
		inst.el.appendChild(inst.sideMenuArticlesContent.el);

		return inst;
	}
}

export default SideMenuArticlesMobile;