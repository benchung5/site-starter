import Component from '../../component';
import { getSingle, deletePlant } from '../../actions/plants';
import Sidebar from '../sidebar';
import SearchTrees from '../../parts/searchTrees';
import PaginationTrees from '../../parts/paginationTrees';
import plantListStore from '../../storage/plantListStore';
import { searchTrees } from '../../actions/plants';
import treesFilterStore from '../../storage/treesFilterStore';
import { globals } from '../../config.js';

var PlantsList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.itemList.before(this.searchTrees.el);
		mainWindow.appendChild(this.paginationTrees.el);
	},
	onDeleteTreeClick: function(e) {
		e.preventDefault();
		let slug = e.target.getAttribute("data-slug");
		let id = e.target.getAttribute("data-id");
		deletePlant({'tree': { id: parseInt(id), slug: slug}}, (apiData) => {
			//perform the tree search again
			searchTrees(treesFilterStore.storageData, (apiData) => {
				plantListStore.setData(apiData);
			});
		});
	},
	renderList: function() {
		this.itemList.innerHTML = '';

		plantListStore.storageData.trees.map((tree) => {
			let el = this.createEl(
			   `<li className="list-group-item">
			        <span>${tree.common_name}</span>
			        <a id="delete" href="" data-id=${tree.id} data-slug=${tree.slug}>Delete</a>
			        <a href="/${globals.ADMIN_URL}#plant-edit?plant=${tree.slug}">edit</Link>
			    </li>`);

				el.querySelector('#delete').addEventListener('click', this.onDeleteTreeClick.bind(this), false);

			    this.itemList.appendChild(el);
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
			`<div class="admin-main">
                <div class="row">
                    <div class="main-window columns small-12 large-9">
                        <h3>Trees</h3>
                        <ul class="list-group item-list">
                        </ul>
                    </div>
                </div>
            </div>`
		});

		inst.sidebar = Sidebar.init();
		inst.searchTrees = SearchTrees.init({});
		inst.paginationTrees = PaginationTrees.init();

		inst.build();

		//listen for updated plantlistStore
		plantListStore.addListener(inst.renderList.bind(inst));

		return inst;
	}
} 


export default PlantsList;