import Component from '../../component';
import { getSingle, deletePlant, searchTrees, resetFilter, updateFilterFromUrl } from '../../actions/plants';
import Sidebar from '../sidebar';
import Search from '../parts/search';
import Pagination from '../../parts/pagination';
import plantListStore from '../../storage/plantListStore';
import plantFilterStore from '../../storage/plantFilterStore';
import plantTablesStore from '../../storage/plantTablesStore';
import { globals } from '../../config';
import verifyAction from '../parts/verifyAction';
import { setUrlParams } from '../../lib/utils';

var PlantsList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.inlineFilters = mainWindow.querySelector('.admin-plants-inline-filters');
		var statusField = this.createEl(
			`<div class="admin-plants-filter-field admin-plants-filter-field--status">
				<label class="admin-plants-filter-label" for="admin-plants-mode">Status</label>
				<select id="admin-plants-mode" class="form-control admin-plants-filter-select" name="admin-plants-mode" aria-label="Filter plants by status"></select>
			</div>`
		);
		this.inlineFilters.appendChild(statusField);
		this.modeSelect = statusField.querySelector('#admin-plants-mode');
		this.searchRow = mainWindow.querySelector('.admin-plants-search-row');
		this.searchRow.appendChild(this.search.el);
		this.itemList.before(this.searchRow);
		this.populateModeOptions();
		this.modeSelect.addEventListener('change', this.onModeFilterChange.bind(this), false);
		mainWindow.appendChild(this.pagination.el);
	},
	populateModeOptions: function() {
		var select = this.modeSelect;
		if (!select) {
			return;
		}
		var modes = plantTablesStore.storageData.mode_id || [];
		select.innerHTML = '';

		var allOpt = document.createElement('option');
		allOpt.value = '';
		allOpt.textContent = 'All';
		select.appendChild(allOpt);

		if (modes.length) {
			modes.slice().sort(function(a, b) {
				return a.id - b.id;
			}).forEach(function(row) {
				var opt = document.createElement('option');
				opt.value = String(row.id);
				var label = row.name || '';
				opt.textContent = label ? label.charAt(0).toUpperCase() + label.slice(1) : String(row.id);
				select.appendChild(opt);
			});
		} else {
			[{ id: 1, name: 'draft' }, { id: 2, name: 'live' }].forEach(function(row) {
				var opt = document.createElement('option');
				opt.value = String(row.id);
				opt.textContent = row.name.charAt(0).toUpperCase() + row.name.slice(1);
				select.appendChild(opt);
			});
		}

		this.syncModeSelectFromStore();
	},
	syncModeSelectFromStore: function() {
		if (!this.modeSelect) {
			return;
		}
		var m = plantFilterStore.storageData.mode;
		this.modeSelect.value = (m !== null && m !== undefined && m !== '') ? String(m) : '';
	},
	onModeFilterChange: function() {
		var raw = this.modeSelect.value;
		var mode = raw === '' ? null : parseInt(raw, 10);
		plantFilterStore.setData({ mode: mode, offset: 0 });
		setUrlParams('offset', 0);
		if (mode == null) {
			setUrlParams('mode', []);
		} else {
			setUrlParams('mode', String(mode));
		}
		this.onUpdate();
	},
	onDeleteTreeClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let slug = e.target.getAttribute("data-slug");
				let id = e.target.getAttribute("data-id");
				deletePlant({'tree': { id: parseInt(id), slug: slug}}, () => {
					searchTrees(plantFilterStore.storageData, (result) => {
						plantListStore.setData(result);
					});
				});
			}
		});
	},
	onUpdate: function() {
		searchTrees(plantFilterStore.storageData, (result) => {
			plantListStore.setData(result);
		});
	},
	onPageChange: function() {
		resetFilter(() => {});
	},
	renderList: function() {
		this.itemList.innerHTML = '';

		plantListStore.storageData.trees.map((tree) => {
			let el = this.createEl(
			   `<li class="list-group-item">
			        <div>${tree.common_name}</div>
			   		<div class="options">
			   		   <a id="products" href="#source-products?source=${tree.id}?slug=${tree.slug}">products</a>
					   <a id="delete" href="" data-id=${tree.id} data-slug=${tree.slug}>delete</a>
					   <a href="/${globals.ADMIN_URL}#plant-edit?plant=${tree.slug}">edit</a>
			   		</div>
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
                        <div class="admin-plants-head">
                            <h3 class="admin-plants-title">Trees</h3>
                            <div class="admin-plants-inline-filters" aria-label="Plant list filters"></div>
                        </div>
                        <div class="admin-plants-search-row"></div>
                        <ul class="list-group item-list large">
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
		plantFilterStore.addListener(inst.syncModeSelectFromStore.bind(inst));

		inst.build();

		//get the filter settings from the url
		updateFilterFromUrl(() => {
			inst.populateModeOptions();
			inst.renderList();
		});

		return inst;
	}
} 


export default PlantsList;