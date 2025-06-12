import Component from '../../component';
import { getUrlParams } from '../../lib/utils';
import { getOrderProducts, deleteOrderProduct } from '../../actions/orderProducts';
import orderProductListStore from '../../storage/orderProductListStore';
import OrderProductAdd from './orderProductAdd';
import OrderProductEdit from './orderProductEdit';
import VerifyAction from '../parts/verifyAction';
import Modal from '../../parts/modal';
import Sidebar from '../sidebar';


var OrderProductList = {
	onAddClick: function(e) {
		e.preventDefault();
		this.orderProductAdd.buildFromOrder(this.order);
		this.modalAdd.open();
	},
	onEditClick: function(e) {
		e.preventDefault();
		this.orderProductEdit.buildFromId(e.srcElement.dataset.edit);
		this.modalEdit.open();
	},
	onDeleteClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let id = e.srcElement.dataset.delete;
				deleteOrderProduct({id: id}, (apiData) => {
					// // shoud say deleted product id
					// console.log(apiData);
					this.buildItems();
				});
			}
		});
	},
	buildItems: function() {
		//first clear the form
		this.orderProductList.innerHTML = '';

		getOrderProducts({order_id: this.order}, (apiData) => {
			orderProductListStore.setData(apiData);
			if(orderProductListStore.storageData.products.length) {
				let productTypeList = [];

				orderProductListStore.storageData.products.map((item) => {
					if (!productTypeList.includes(item.productTypeName)) {
						productTypeList.push(item.productTypeName);
					}
				});

				//render it
				productTypeList.map((productTypeItem) => {
					let productTypeEl = this.createEl(`<div><span>product type: ${productTypeItem}</span>
													   <ul id="products-by-type-list" class="list-group item-list"></ul></div>`);
					let productListEl = productTypeEl.querySelector('#products-by-type-list');
					orderProductListStore.storageData.products.map((productItem) => {
						if (productItem.productTypeName == productTypeItem) {
							let productEl = this.createEl(`<li clasname="list-group-item">
								<div>name: ${productItem.name}</div>
								<div>quantity: ${productItem.quantity}</div>
								<div>
									<a data-delete="${productItem.id}"">delete</a>
									<a data-edit="${productItem.id}">edit</a>
								</div>
								</li>`);
							productListEl.appendChild(productEl);
							let editButton = productEl.querySelector('[data-edit]');
							editButton.addEventListener('click', this.onEditClick.bind(this), false);
							let deleteButton = productEl.querySelector('[data-delete]');
							deleteButton.addEventListener('click', this.onDeleteClick.bind(this), false);
						}

						
					});
					this.orderProductList.appendChild(productTypeEl);
				});

				//close the add or edit product modal once data is updated
				this.modalAdd.close();
				this.modalEdit.close();
			}
		});
	},
	onLoad: function() {
		this.order = getUrlParams('order')[0];
		this.orderProductEl.innerHTML = this.order;
		this.orderLinkEl.href = `#order-edit?order=${this.order}`;
		this.buildItems();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//init storage
		orderProductListStore.init();

		//call initialize on Component first
		inst.initialize({
			el:
     		`<div class="admin-main">
                   <div class="row">
                       <div class="main-window columns small-12 large-9">
                           <div id="products-list-container">
                              <span>products for order<a id="order-link"> <span id="order-el"></span></a>:</span><br><br>
                   			  <div id="order-product-list"></div>
                   			  <a id="add" href="" >Add Product</a> 
                            </div>
                       </div>
                   </div>
               </div>
     		`
		});

		inst.sidebar = Sidebar.init({});
		inst.orderProductAdd = OrderProductAdd.init({
			onSuccess: inst.buildItems.bind(inst),
		});
		inst.orderProductEdit = OrderProductEdit.init({
			onSuccess: inst.buildItems.bind(inst),
		});
		inst.modalAdd = Modal.init({ contentElement: inst.orderProductAdd.el });
		inst.modalEdit = Modal.init({ contentElement: inst.orderProductEdit.el });
		inst.verifyAction = VerifyAction.init({
			message: 'delete item?'
		});


		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);

		inst.orderProductList = inst.el.querySelector('#order-product-list');
		inst.orderProductEl = inst.el.querySelector('#order-el');
		inst.orderLinkEl = inst.el.querySelector('#order-link');

		inst.el.querySelector('#add').addEventListener('click', inst.onAddClick.bind(inst), false);

		return inst;
	}
}

export default OrderProductList;