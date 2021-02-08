import Component from '../../component';
import { getSingle, deletePlant } from '../../actions/plants';
import Sidebar from '../sidebar';
import Search from '../../parts/search';
import Pagination from '../../parts/pagination';
import plantListStore from '../../storage/plantListStore';
import { searchTrees } from '../../actions/plants';
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
	updateOffset: function(newOffset) {
		plantFilterStore.setData({ offset: newOffset });
		setUrlParams('offset', newOffset);
		//search trees
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
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
	search: function(search) {
		//update the trees filter then search using the updated trees filter
		//always reset the offset to 0 when searching so you view the first page
		plantFilterStore.setData({ search: search, offset: 0 });
		setUrlParams('offset', 0);
		setUrlParams('search', search);
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
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
		inst.search = Search.init({
			filterStore: plantFilterStore,
			search: inst.search.bind(inst)
		});
		inst.pagination = Pagination.init({
			filterStore: plantFilterStore,
			entriesPerPage: globals.ADMIN_ENTRIES_PER_PAGE,
			listStore: plantListStore,
			updateOffset: inst.updateOffset.bind(inst),
		});
		inst.verifyAction = verifyAction.init({
			message: 'delete item?'
		});

		//listen for updated plantlistStore
		plantListStore.addListener(inst.renderList.bind(inst));

		inst.build();
		inst.renderList();

		return inst;
	}
} 


export default PlantsList;