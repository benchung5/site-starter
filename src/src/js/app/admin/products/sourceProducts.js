import Component from '../../component';
import { getUrlParams } from '../../lib/utils';
import { getProducts } from '../../actions/products';
import productListStore from '../../storage/productListStore';
import ProductAdd from './productAdd';
import Modal from '../../parts/modal';


var SourceProducts = {

	onAddClick: function(e) {
		e.preventDefault();
		this.modal.open();
	},
	buildItems: function() {
		if(productListStore.storageData.products.length) {

			let productTypeList = [];

			productListStore.storageData.products.map((item) => {
				if (!productTypeList.includes(item.productTypeName)) {
					productTypeList.push({"productTypeName" : item.productTypeName, "products" : []});
				}
			});

			productTypeList.map((productTypeItem) => {
				productListStore.storageData.products.map((productItem) => {					
					if (productItem.productTypeName == productTypeItem.productTypeName) {
						let prod = {
										"id" : productItem.id,
										"price" : productItem.price,
										"status" : productItem.status,
										"amountAvailable" : productItem.amount_available,
										"productTypeVariationName" : productItem.productTypeVariationName,
									};
						productTypeItem.products.push(prod);
					}
				});

			});

			//render it
			productTypeList.map((productTypeItem) => {
				let productTypeEl = this.createEl(`<div><span>product type: ${productTypeItem.productTypeName}</span>
												   <ul id="products-by-type-list" class="list-group item-list"></ul></div>`);
				let productListEl = productTypeEl.querySelector('#products-by-type-list');
				productTypeItem.products.map((productItem) => {
					let productEl = this.createEl(`<li clasname="list-group-item">
						<div>id: ${productItem.id}</div>
						<div>price: $${productItem.price/100}</div>
						<div>status: ${productItem.status}</div>
						<div>amount available: ${productItem.amountAvailable}</div>
						<div>variation: ${productItem.productTypeVariationName}</div>
						<div><a>edit</a></div>
						</li>`);
					productListEl.appendChild(productEl);
				});
				this.sourceProductList.appendChild(productTypeEl);
			});
		}
	},
	onLoad: function() {
		this.source = getUrlParams('source')[0];

		this.sourceProductEl.innerHTML = this.source;

		getProducts({source_id: this.source}, (apiData) => {
			productListStore.setData(apiData);
			this.buildItems();
		});
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
			`<div id="products-list-container">
              <span>products for plant<a id="source-link" target="_blank"> <span id="source-product-el"></span></a>:</span><br><br>
			  <div id="source-product-list"></div>
			  <a id="add" href="" >Add Product</a> 
             </div>`
		});



		inst.sourceProductList = inst.el.querySelector('#source-product-list');
		inst.sourceProductEl = inst.el.querySelector('#source-product-el');

		inst.el.querySelector('#add').addEventListener('click', inst.onAddClick.bind(inst), false);

		inst.productAdd = ProductAdd.init({});
		inst.modal = Modal.init({ contentElement: inst.productAdd.el });

		return inst;
	}
}

export default SourceProducts;