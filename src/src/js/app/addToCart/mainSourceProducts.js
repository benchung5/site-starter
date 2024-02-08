import Component from '../component';
import { getProducts } from '../actions/products';
import productListStore from '../storage/productListStore';
import InputPlusMinus from '../parts/inputPlusMinus';
import { moveElement } from '../lib/utils';

(function() {
	var Main = {
		buildItems: function() {
			productListStore.storageData.products.map((item) => {
				let createProd = (elem, item) => {
					let inputPlusMinus = InputPlusMinus.init({
						inputName: item.id
					});
					let product = this.createEl(`<div class="product"><div class="prod-variation-name">${item.productTypeVariationName}</div>
						<div class="prod-price">$${item.price}</div></div>`);
					product.appendChild(inputPlusMinus.el);
					elem.appendChild(product);
				}
				if(item.productTypeName == 'seeds') {
					createProd(this.seeds, item);
				}
				if(item.productTypeName == 'plants') {
					createProd(this.plants, item);
				}

			});
		},
		onMobileChange: function(e) {
			if(e.detail.isMobile) {
				moveElement(this.bodyAreaEl, this.mobileBodyAreaEl);
			}
			if(e.detail.isMobile == false) {
				moveElement(this.bodyAreaEl, this.desktopBodyAreaEl);
			} 

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
				container: document.querySelector('#source-product-list-container'),
				el: 
				`<div class="source-product-list">
					<form>
						<div class="product-type">
							<div class="title-container"><div class="icon-seeds"></div><h4>Seeds</h4></div>
							<div id="seeds"></div>
						</div>
						<div class="product-type">
							<div class="title-container"><div class="icon-plants"></div><h4>Plants</h4></div>
							<div id="plants"></div>
						</div>
						<input id="add-to-cart-input" type="hidden" value="" ></input>
						<button action="submit" class="btn btn-primary">Add To Cart</button>
					</form>
					
				</div>`
			});

			inst.seeds = inst.el.querySelector('#seeds');
			inst.plants = inst.el.querySelector('#plants');
			inst.addToCartInput = inst.el.querySelector('#add-to-cart-input');

			//get the currentTreeId from local storage variable set through php in view_plant.php
			let currentTreeId = localStorage.getItem('currentTreeId');

			getProducts({source_id: currentTreeId}, (apiData) => {
				productListStore.setData(apiData);
				inst.buildItems();
			});

			// productListStore.addListener(inst.buildItems.bind(inst));
			this.bodyAreaEl = document.getElementById('body-area');
			this.mobileBodyAreaEl = document.getElementById('mobile-body-area-container');
			this.desktopBodyAreaEl = document.getElementById('desktop-body-area-container');
			window.addEventListener('isMobile', this.onMobileChange.bind(this));
		}
	}

	Main.init();
})();