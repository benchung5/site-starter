import Component from '../component';
import { getProducts } from '../actions/products';
import productListStore from '../storage/productListStore';

(function() {
	var Main = {
		buildItems: function() {
			productListStore.storageData.products.map((item) => {
				let seedProduct = this.createEl(`<div>${item.id}, ${item.productTypeName}, 
					${item.productTypeVariationName}, $${item.price}</div>`);
				this.seeds.appendChild(seedProduct);
			});
		},
		init: function() {
			var proto = Object.assign({}, this, Component);
			var inst = Object.create(proto);
			// assign the instance constructor to the prototype so 'this' refers to the instance
			proto.constructor = inst;

			//init storage
			productListStore.init();

			inst.initialize({
				//select the container in the document
				container: document.querySelector('.source-product-list-container'),
				el: 
				`<div class="source-product-list">
					<div class="seeds"></div>
				</div>`
			});

			inst.seeds = inst.el.querySelector('.seeds');

			//get the currentTreeId from local storage variable set through php in view_plant.php
			let currentTreeId = localStorage.getItem('currentTreeId');

			getProducts({source_id: currentTreeId}, (apiData) => {
				productListStore.setData(apiData);
			});

			productListStore.addListener(inst.buildItems.bind(inst));

			inst.buildItems();
		}
	}

	Main.init();
})();