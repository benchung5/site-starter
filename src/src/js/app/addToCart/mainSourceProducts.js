import Component from '../component';
import { getProducts } from '../actions/products';
import productListStore from '../storage/productListStore';
import appStateStore from '../storage/appStateStore';
import InputPlusMinus from '../parts/inputPlusMinus';
import CartPopup from './cartPopup';
import { moveElement, clone } from '../lib/utils';
import { addItemToCart } from '../actions/cart';
import Loader from '../parts/loader';

(function() {
	var Main = {
		submitForm: function(e) {
			//prevent form from refreshing the page
			e.preventDefault();
			let formData = new FormData(e.target);
			// [[product_id, quantity]]
			let formDataArray = Array.from(formData);

			let productsForCart = formDataArray.map((formDataItem) => {
				productListStore.storageData.products.map((productListStoreItem) => {
					if (formDataItem[0] == productListStoreItem.id && formDataItem[1] > 0) {
						let productListStoreItemClone = clone(productListStoreItem);
						let newItem = Object.assign(productListStoreItemClone, 
							{ image : this.currentPlantImage }, 
							{ plantId : this.currentPlantId}, 
							{ commonName : this.currentPlantCommonName },
							{ botanicalName : this.currentPlantBotanicalName },
							{ plantUrl : this.currentPlantUrl },
							{ quantity : formDataItem[1] },
							);
						addItemToCart(newItem);
					}
				});
			});

			this.cartPopup.open();
		},
		buildItems: function() {
			productListStore.storageData.products.map((item) => {
				let createProd = (elem, item) => {
					let priceOrMessage = "$"+item.price;
					let inputOrNotify = null;

					if(item.amount_available > 0) {
						let inputPlusMinus = InputPlusMinus.init({
							inputName: item.id,
							maxValue: item.amount_available
						});
						inputOrNotify = inputPlusMinus.el
					} else {
						inputOrNotify = this.createEl(`<a class="btn-secondary">Notify Me</a>`);
						priceOrMessage = 'Out of Stock';
					}
					let product = this.createEl(`<div class="product"><div class="prod-variation-name">${item.productTypeVariationName}</div>
						<div class="prod-price">${priceOrMessage}</div><div class="prod-quantity"></div></div>`);
					let productQuantity = product.querySelector('.prod-quantity');
					productQuantity.appendChild(inputOrNotify);
					
					elem.appendChild(product);
				}
				if(item.productTypeName == 'Seeds') {
					createProd(this.seeds, item);
				}
				if(item.productTypeName == 'Plants') {
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
			appStateStore.init();

			inst.initialize({
				el: 
				`
				<form>
					<div class="source-product-list">
						<div class="product-type">
							<div class="title-container"><div class="icon-seeds"></div><h4>Seeds</h4></div>
							<div id="seeds"></div>
						</div>
						<div class="product-type">
							<div class="title-container"><div class="icon-plants"></div><h4>Plants</h4></div>
							<div id="plants"></div>
						</div>
						<input id="add-to-cart-input" type="hidden" value="" ></input>
					</div>
					<button action="submit" class="btn btn-primary">Add To Cart</button>
				</form>
				`
			});

			inst.seeds = inst.el.querySelector('#seeds');
			inst.plants = inst.el.querySelector('#plants');
			inst.addToCartInput = inst.el.querySelector('#add-to-cart-input');

			//get the currentPlantId from local storage variable set through php in view_plant.php
			inst.currentPlantId = localStorage.getItem('currentPlantId');
			inst.currentPlantImage = localStorage.getItem('currentPlantImage');
			inst.currentPlantBotanicalName = localStorage.getItem('currentPlantBotanicalName');
			inst.currentPlantCommonName = localStorage.getItem('currentPlantCommonName');
			inst.currentPlantUrl= localStorage.getItem('currentPlantUrl');

			//insert into loader, then insert that into the page container
			inst.loader = Loader.init({
				children: inst.el,
				isInitialPageLoad: true,
				backgroundColor: '#f4f6f7'
			});
			let container = document.querySelector('#source-product-list-container');
			container.appendChild(inst.loader.el);

			getProducts({source_id: inst.currentPlantId}, (apiData) => {
				productListStore.setData(apiData);
				inst.buildItems();
			});

			inst.el.addEventListener('submit', inst.submitForm.bind(inst));

			inst.cartPopup = CartPopup.init();

			// productListStore.addListener(inst.buildItems.bind(inst));
			this.bodyAreaEl = document.getElementById('body-area');
			this.mobileBodyAreaEl = document.getElementById('mobile-body-area-container');
			this.desktopBodyAreaEl = document.getElementById('desktop-body-area-container');
			window.addEventListener('isMobile', this.onMobileChange.bind(this));




			//making the custom event 'localUpdated' for when localStorage is updated
			//because no existing event for this
			// ---------------------------------------------------------/
			//capture the original function
			const localStore = localStorage.setItem;

			//add event creator to prototype of localStorage
			Object.getPrototypeOf(localStorage).localStorageEvent = function() {
				if(!this.evt) {
					this.evt = new Event('localUpdated');
				}
				return this.evt;
			}.bind(this);

			//make a new function to replace it, then call the original
			//function within this
			localStorage.setItem = function(key, value) {
			  const evt = this.localStorageEvent();
			        evt.key = key; 
			        evt.value = value; 

			  document.dispatchEvent(evt);
			  // 'this' refers to the object that calls the function
			  localStore.apply(this, arguments);
			};
		}
	}

	Main.init();
})();