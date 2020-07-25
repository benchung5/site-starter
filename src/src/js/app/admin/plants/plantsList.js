import Component from '../../component';
import { getSingle } from '../../actions/trees';
import Sidebar from '../sidebar';
import SearchTrees from '../../parts/searchTrees';
import plantList from '../../storage/plantList';
import { globals } from '../../config.js';

var PlantsList = {
	build: function() {
		this.el.querySelector('.main-window').before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.itemList.before(this.searchTrees.el);
	},
	onDeleteTreeClick: function(e) {

	},
	renderList(plantList) {
		this.itemList.innerHTML = '';

		plantList.trees.map((tree) => {
			let el = this.createEl(
			   `<li className="list-group-item">
			        <span>${tree.common_name}</span>
			        <a href="#" data-id=${tree.id} data-slug=${tree.slug}>Delete</a>
			        <Link to="/${globals.ADMIN_URL}/trees-list/${tree.slug}">edit</Link>
			    </li>`);

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
		inst.searchTrees = SearchTrees.init();

		inst.getData();

		inst.build();

		//listen for updated plantlist
		window.addEventListener('plantListUpdated', function(e) {
		  inst.renderList(plantList.storageData);
		});

		return inst;
	}
} 


export default PlantsList;