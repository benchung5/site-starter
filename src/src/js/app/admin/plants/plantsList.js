import Component from '../../component';
import { getSingle, deletePlant, searchTrees, resetFilter, updateFilterFromUrl } from '../../actions/plants';
import Sidebar from '../sidebar';
import Search from '../../parts/search';
import Pagination from '../../parts/pagination';
import plantListStore from '../../storage/plantListStore';
import plantFilterStore from '../../storage/plantFilterStore';
import { globals } from '../../config';
import verifyAction from '../parts/verifyAction';
import { setUrlParams } from '../../lib/utils';

var PlantsList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.itemList.before(this.search.el);
		mainWindow.appendChild(this.pagination.el);
	},
	onDeleteTreeClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let slug = e.target.getAttribute("data-slug");
				let id = e.target.getAttribute("data-id");
				deletePlant({'tree': { id: parseInt(id), slug: slug}}, (apiData) => {
					//perform the tree search again
					searchTrees(plantFilterStore.storageData, (apiData) => {
						plantListStore.setData(apiData);
					});
				});
			}
		});
	},
	onUpdate() {
		//search trees
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
		});
	},
	onPageChange() {
		//reset the filter settings first
		resetFilter(() => {});
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

		inst.sidebar = Sidebar.init({
			onPageChange: inst.onPageChange.bind(inst),
		});
		inst.search = Search.init({
			filterStore: plantFilterStore,
			onUpdate: inst.onUpdate.bind(inst)
		});
		inst.pagination = Pagination.init({
			filterStore: plantFilterStore,
			listStore: plantListStore,
			onUpdate: inst.onUpdate.bind(inst),
		});
		inst.verifyAction = verifyAction.init({
			message: 'delete item?'
		});

		//listen for updated plantlistStore
		plantListStore.addListener(inst.renderList.bind(inst));

		inst.build();

		//get the filter settings from the url
		updateFilterFromUrl(() => {
			inst.renderList();
		});

		return inst;
	}
} 


export default PlantsList;