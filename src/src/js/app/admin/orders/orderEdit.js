import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDateInput from '../parts/fieldDateInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldTextarea from '../parts/fieldTextarea';
import Sidebar from '../sidebar';
import orderFields from './orderFields';
import orderTablesStore from '../../storage/orderTablesStore';
import { fetchOrderTables, getOrder, updateOrder } from '../../actions/orders';
import appStateStore from '../../storage/appStateStore';
import { getUrlParams } from '../../lib/utils';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';
import Modal from '../../parts/modal';
import ShippingLabel from './shippingLabel';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var OrderEdit = {
	onPrintShippingLabelClick: function(e) {
		e.preventDefault();
		this.modalShippingLabel.open();
	},
	submitForm: function(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		//append the current order id
		formData.append('id', this.orderId);

		// //delete any empty fields in formData
		// Array.from(formData).map((item) => {
		// 	if (item[1] == '') {
		// 		formData.delete(item[0]);
		// 	}
		// });

		//handle field errors
		let hasErrors = checkFieldErrors(e.target, orderFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please correct the above errors</span>`);
		} else {
			// call action to submit edited
			updateOrder(formData, this.renderUpdated.bind(this));

			//form no longer touched
			appStateStore.setData({ formTouched: false })

			this.updateMessage.clear();
		}
	},
	onInputChange: function() {
		this.updateMessage.clear();
	},
	renderUpdated: function(response) {
		if(response.error) {
			this.updateMessage.renderError(`<span>Error: ${response.error}</span>`);
		} else {
			this.updateMessage.renderSuccess(`Order: ${response.id}<br/>successfully updated.`);
		}
	},
	onLoad: function() {
		//first clear the form
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		//get the order data
		const order = getUrlParams('order')[0];
		getOrder(order, (apiData) => {
			//get order table data
			fetchOrderTables((orderTablesData) => {
				orderTablesStore.setData(orderTablesData);
				//update the link to the products
				this.products.href = `#order-product-list?order=${apiData.id}`;
				//update the link to the label
				this.shippingLabel.href = `/shipment/download_shipping_label/${apiData.id}`;
				//record the current order id
				this.orderId = apiData.id;
				this.shippingLabel.buildFromOrder(this.orderId);
				//create the fields
				orderFields.map((item) => {
					if(item.type === 'input') {
						let input = FieldInput.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name]
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'dateInput') {
						let input = FieldDateInput.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name]
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'dropdownSelect') {

						console.log(orderTablesStore.storageData[item.name]);

						let dropdownSelect = FieldDropdownSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name],
							selectItems: orderTablesStore.storageData[item.name]
						});
						this.formFields.appendChild(dropdownSelect.el);
					}
					if(item.type === 'multiSelect') {
						let multiSelect = FieldMultiSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name],
							selectItems: orderTablesStore.storageData[item.name]
						});
						this.formFields.appendChild(multiSelect.el);
					}
					if(item.type === 'textarea') {
						let input = FieldTextarea.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name]
						});
						this.formFields.appendChild(input.el);
					}
				});
			});
		});
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({ el: 
		`<div class="admin-main">
              <div class="row">
                  <div class="main-window columns small-12 large-9">
                      <h3>Edit Order</h3>
                      <div style="float: right; display: inline-block;">
												<a id="products">&nbsp;&nbsp;view products</a>&nbsp;<a id="shipping-label">&nbsp;&nbsp;print label</a>
                      </div>
                      <form>
	                      <div id="form-fields">
	                      </div>
	                      <button action="submit" class="btn btn-primary">Submit</button>
                      </form>
                  </div>
              </div>
          </div>
	      `
		});

		//build
		inst.sidebar = Sidebar.init({});
		inst.updateMessage = UpdateMessage.init({});
		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);
		inst.products = inst.el.querySelector('#products');
		inst.printShippingLabel = inst.el.querySelector('#shipping-label');
		inst.shippingLabel = ShippingLabel.init({
			onSuccess: () => { inst.modalShippingLabel.close(); },
		});
		inst.modalShippingLabel = Modal.init({ contentElement: inst.shippingLabel.el });
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.form = inst.el.querySelector('form');
		inst.printShippingLabel.addEventListener('click', inst.onPrintShippingLabelClick.bind(inst));
		inst.form.addEventListener('submit', inst.submitForm.bind(inst)); 
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);

		return inst;
	}
}


export default OrderEdit;