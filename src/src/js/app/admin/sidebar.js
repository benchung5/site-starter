import Component from '../component';
import appStateStore from '../storage/appStateStore';
import verifyAction from './parts/verifyAction';
import Router from '../router';

var Sidebar = {
	linkList: [
		{ title: 'Website', link: '/', active: false },
		{ title: 'Logout', link: 'signed-out', active: false },
		{ title: 'Dashboard', link: '', active: false },
		{ title: 'View Articles', link: 'article-list', active: false },
		{ title: 'Add Articles', link: 'article-add', active: false },
		{ title: 'View Plants', link: 'plants-list', active: false },
		{ title: 'Add Plants', link: 'plant-add', active: false },
		{ title: 'View Users', link: 'users-list', active: false },
		{ title: 'Add User', link: 'signup', active: false },
		{ title: 'View Categories', link: 'category-list', active: false },
		{ title: 'Add Category', link: 'category-add', active: false },
		{ title: 'Backup', link: 'backup', active: false },
	],
	build: function() {
		let sidebar = this.el.querySelector('.admin-side-menu');
		this.linkList.map((item) => {
			let link = this.createEl(`<li class=${item.active ? 'active' : ''}>
			    <a class="nav-link" href=${item.link}>${item.title}</a>
			</li>`);
			link.addEventListener('click', (e) => {
				e.preventDefault();
				if(appStateStore.storageData.formTouched) {
					this.verifyAction.open((verified) => {
						if(verified) {
							Router.push(item.link);
							appStateStore.setData({ formTouched: false });
						}
					});
				} else {
					Router.push(item.link);
				}
			}, false);
			sidebar.appendChild(link);
		});
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el:
			`<div class="columns small-12 large-3 admin-sidebar">
                <ul class="vertical menu admin-side-menu">
                </ul>
             </div>`
		});

		inst.verifyAction = verifyAction.init({
			message: 'navigate away?'
		});

		inst.build();

		return inst;
	}
}

export default Sidebar;