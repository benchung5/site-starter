import Component from '../../component';
import { getUrlParams } from '../../lib/utils';
import { getProducts, deleteProduct } from '../../actions/products';
import productListStore from '../../storage/productListStore';
import ProductAdd from './productAdd';
import ProductEdit from './productEdit';
import VerifyAction from '../parts/verifyAction';
import Modal from '../../parts/modal';
import Sidebar from '../sidebar';


var SourceProducts = {
	onAddClick: function(e) {
		e.preventDefault();
		this.productAdd.buildFromSource(this.source);
		this.modalAdd.open();
	},
	onEditClick: function(e) {
		e.preventDefault();
		this.productEdit.buildFromId(e.srcElement.dataset.edit);
		this.modalEdit.open();
	},
	onDeleteClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let id = e.srcElement.dataset.delete;
				deleteProduct({id: id}, (apiData) => {
					// // shoud say deleted product id
					// console.log(apiData);
					this.buildItems();
				});
			}
		});
	},
	buildItems: function() {
		//first clear the form
		this.sourceProductList.innerHTML = '';

		getProducts({source_id: this.source}, (apiData) => {
			productListStore.setData(apiData);
			if(productListStore.storageData.products.length) {
				let productTypeList = [];

				productListStore.storageData.products.map((item) => {
					if (!productTypeList.includes(item.productTypeName)) {
						productTypeList.push(item.productTypeName);
					}
				});

				//render it
				productTypeList.map((productTypeItem) => {
					let productTypeEl = this.createEl(`<div><span>product type: ${productTypeItem}</span>
													   <ul id="products-by-type-list" class="list-group item-list small"></ul></div>`);
					let productListEl = productTypeEl.querySelector('#products-by-type-list');
					productListStore.storageData.products.map((productItem) => {
						if (productItem.productTypeName == productTypeItem) {
							let productEl = this.createEl(`<li clasname="list-group-item">
								<div>id: ${productItem.id}</div>
								<div>price: $${productItem.price/100}</div>
								<div>status: ${productItem.status}</div>
								<div>amount available: ${productItem.amount_available}</div>
								<div>variation: ${productItem.productTypeVariationName}</div>
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
					this.sourceProductList.appendChild(productTypeEl);
				});

				//close the add or edit product modal once data is updated
				this.modalAdd.close();
				this.modalEdit.close();
			}
		});
	},
	onLoad: function() {
		this.source = getUrlParams('source')[0];
		this.slug = getUrlParams('slug')[0];
		this.sourceProductEl.innerHTML = this.slug;
		this.sourceLinkEl.href = `#plant-edit?plant=${this.slug}`;
		this.buildItems();
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//init storage
		productListStore.init();

		//call initialize on Component first
		inst.initialize({
			el:
     		`<div class="admin-main">
                   <div class="row">
                       <div class="main-window columns small-12 large-9">
                           <div id="products-list-container">
                              <span>products for plant<a id="source-link"> <span id="source-product-el"></span></a>:</span><br><br>
                   			  <div id="source-product-list"></div>
                   			  <a id="add" href="" >Add Product</a> 
                            </div>
                       </div>
                   </div>
               </div>
     		`
		});

		inst.sidebar = Sidebar.init({});
		inst.productAdd = ProductAdd.init({
			onSuccess: inst.buildItems.bind(inst),
		});
		inst.productEdit = ProductEdit.init({
			onSuccess: inst.buildItems.bind(inst),
		});
		inst.modalAdd = Modal.init({ contentElement: inst.productAdd.el });
		inst.modalEdit = Modal.init({ contentElement: inst.productEdit.el });
		inst.verifyAction = VerifyAction.init({
			message: 'delete item?'
		});


		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);

		inst.sourceProductList = inst.el.querySelector('#source-product-list');
		inst.sourceProductEl = inst.el.querySelector('#source-product-el');
		inst.sourceLinkEl = inst.el.querySelector('#source-link');

		inst.el.querySelector('#add').addEventListener('click', inst.onAddClick.bind(inst), false);

		return inst;
	}
}

export default SourceProducts;