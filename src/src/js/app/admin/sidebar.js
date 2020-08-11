import Component from '../component';
import { globals } from '../config.js';

var Sidebar = {
	linkList: [
		{ title: 'Website', link: '/', active: false },
		{ title: 'Logout', link: '/'+globals.ADMIN_URL+'#signed-out', active: false },
		{ title: 'Dashboard', link: '/'+globals.ADMIN_URL+'', active: false },
		{ title: 'View Articles', link: '/'+globals.ADMIN_URL+'#articles-list', active: false },
		{ title: 'Add Articles', link: '/'+globals.ADMIN_URL+'#article-add', active: false },
		{ title: 'View Plants', link: '/'+globals.ADMIN_URL+'#plants-list', active: false },
		{ title: 'Add Plants', link: '/'+globals.ADMIN_URL+'#plant-add', active: false },
		{ title: 'View Users', link: '/'+globals.ADMIN_URL+'#users-list', active: false },
		{ title: 'Add User', link: '/'+globals.ADMIN_URL+'#signup', active: false },
		{ title: 'View Categories', link: '/'+globals.ADMIN_URL+'#category-list', active: false },
		{ title: 'Add Category', link: '/'+globals.ADMIN_URL+'#category-add', active: false },
		{ title: 'Backup', link: '/'+globals.ADMIN_URL+'#backup', active: false },
	],
	build: function() {
		let sidebar = this.el.querySelector('.admin-side-menu');
		this.linkList.map((item) => {
			let link = this.createEl(`<li class=${item.active ? 'active' : ''}>
			    <a class="nav-link" href=${item.link}>${item.title}</a>
			</li>`);
			link.addEventListener('click', (e) => {
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

		inst.build();

		return inst;
	}
}

export default Sidebar;