import Component from '../../component';
import Sidebar from '../sidebar';
import VerifyAction from '../parts/verifyAction';
import Modal from '../../parts/modal';
import Pagination from '../../parts/pagination';
import ProductEdit from './productEdit';
import productListStore from '../../storage/productListStore';
import productFilterStore from '../../storage/productFilterStore';
import { getProducts, deleteProduct } from '../../actions/products';

var ProductsList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		mainWindow.appendChild(this.pagination.el);
	},
	onDeleteProductClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if (verified) {
				let id = e.target.getAttribute("data-id");
				deleteProduct({ id: parseInt(id) }, () => {
					this.onLoad();
				});
			}
		});
	},
	onEditClick: function(e) {
		e.preventDefault();
		this.productEdit.buildFromId(e.target.getAttribute("data-id"));
		this.modalEdit.open();
	},
	renderList: function() {
		this.itemList.innerHTML = '';
		productListStore.storageData.products.map((product) => {
			const sourceNames = product.source_names ? ` (${product.source_names})` : '';
			const name = product.name ? product.name : `Product ${product.id}`;
			let el = this.createEl(
			   `<li class="list-group-item">
			        <div>${name}${sourceNames}</div>
			   		<div class="options">
					   <a id="delete" href="" data-id=${product.id}>delete</a>
					   <a id="edit" href="" data-id=${product.id}>edit</a>
			   		</div>
			    </li>`);
			el.querySelector('#delete').addEventListener('click', this.onDeleteProductClick.bind(this), false);
			el.querySelector('#edit').addEventListener('click', this.onEditClick.bind(this), false);
			this.itemList.appendChild(el);
		});
	},
	onLoad: function() {
		getProducts(productFilterStore.storageData, (apiData) => {
			productListStore.setData(apiData);
			this.renderList();
		});
	},
	onUpdate: function() {
		this.onLoad();
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		productListStore.init();
		productFilterStore.init();

		inst.initialize({
			el: 
			`<div class="admin-main">
                <div class="row">
                    <div class="main-window columns small-12 large-9">
                        <h3>Products</h3>
                        <ul class="list-group item-list large">
                        </ul>
                    </div>
                </div>
            </div>`
		});

		inst.sidebar = Sidebar.init({});
		inst.verifyAction = VerifyAction.init({
			message: 'delete item?'
		});
		inst.pagination = Pagination.init({
			filterStore: productFilterStore,
			listStore: productListStore,
			onUpdate: inst.onUpdate.bind(inst),
		});
		inst.productEdit = ProductEdit.init({
			onSuccess: inst.onLoad.bind(inst),
		});
		inst.modalEdit = Modal.init({ contentElement: inst.productEdit.el });

		inst.build();

		return inst;
	}
}

export default ProductsList;
