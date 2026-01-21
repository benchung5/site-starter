import Component from '../../component';
import { getSingle, deleteOrder, searchOrders, resetFilter, updateFilterFromUrl } from '../../actions/orders';
import Sidebar from '../sidebar';
import Search from '../parts/search';
import Pagination from '../../parts/pagination';
import orderListStore from '../../storage/orderListStore';
import orderFilterStore from '../../storage/orderFilterStore';
import { globals } from '../../config';
import verifyAction from '../parts/verifyAction';
import { setUrlParams } from '../../lib/utils';

var OrdersList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.itemList.before(this.search.el);
		mainWindow.appendChild(this.pagination.el);
	},
	onDeleteOrderClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let id = e.target.getAttribute("data-id");
				deleteOrder({ id: parseInt(id)}, (apiData) => {
					//perform the order search again
					searchOrders(orderFilterStore.storageData, (apiData) => {
						orderListStore.setData(apiData);
					});
				});
			}
		});
	},
	onUpdate() {
		//search orders
		searchOrders(orderFilterStore.storageData, (apiData) => {
			orderListStore.setData(apiData);
		});
	},
	onPageChange() {
		//reset the filter settings first
		resetFilter(() => {});
	},
	renderList: function() {
		this.itemList.innerHTML = '';

		orderListStore.storageData.orders.map((order) => {
			let el = this.createEl(
			   `<li class="list-group-item">
			        <div>${order.id}</div>
			        <div>${order.name}</div>
			        <div>${order.created}</div>
			   		<div class="options">
					   <a id="delete" href="" data-id=${order.id}>delete</a>
					   <a href="/${globals.ADMIN_URL}#order-edit?order=${order.id}">edit</a>
			   		</div>
			    </li>`);

				el.querySelector('#delete').addEventListener('click', this.onDeleteOrderClick.bind(this), false);

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
                        <h3>Orders</h3>
                        <ul class="list-group item-list small">
                        </ul>
                    </div>
                </div>
            </div>`
		});

		inst.sidebar = Sidebar.init({
			onPageChange: inst.onPageChange.bind(inst),
		});
		inst.search = Search.init({
			filterStore: orderFilterStore,
			onUpdate: inst.onUpdate.bind(inst)
		});
		inst.pagination = Pagination.init({
			filterStore: orderFilterStore,
			listStore: orderListStore,
			onUpdate: inst.onUpdate.bind(inst),
		});
		inst.verifyAction = verifyAction.init({
			message: 'delete item?'
		});

		//listen for updated orderListStore
		orderListStore.addListener(inst.renderList.bind(inst));

		inst.build();

		//get the filter settings from the url
		updateFilterFromUrl(() => {
			inst.renderList();
		});

		return inst;
	}
} 


export default OrdersList;