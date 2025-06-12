import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldHidden from '../parts/fieldHidden';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldTextarea from '../parts/fieldTextarea';
import { fetchOrderProductTables, getOrderProduct, updateOrderProduct } from '../../actions/orderProducts';
import orderProductTablesStore from '../../storage/orderProductTablesStore';
import appStateStore from '../../storage/appStateStore';
import orderProductFields from './orderProductFields';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

var OrderProductEdit = {
	submitForm: function(e) {
		// prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		//delete any empty fields in formData
		Array.from(formData).map((item) => {
			if (item[1] == '') {
				formData.delete(item[0]);
			}
		});

		// //use this to log out formdata values
		// console.log(Array.from(formData));

		//handle field errors
		let hasErrors = checkFieldErrors(e.target, orderProductFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			//form no longer touched
			appStateStore.setData({ formTouched: false });

			// call action to submit edited
			updateOrderProduct(formData, this.renderUpdated.bind(this));

			this.updateMessage.clear();
		}
	},
	onInputChange: function() {
		this.updateMessage.clear();
	},
	renderUpdated: function(response) {
		this.updateMessage.clear();
		if(response.error) {
			this.updateMessage.renderError(`<span>Error: ${response.error}</span>`);
		} else {
			this.updateMessage.renderSuccess(`Product id: ${response.id}<br/>successfully added.`);
			this.onSuccess();
		}
	},
	buildFromId: function(id) {
		//first clear the form fields
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		//get the order product
		getOrderProduct(id, (orderProduct) => {
			//get order product table data
			fetchOrderProductTables((orderProductTables) => {
				//use orderProductTablesStore because some values exist there statically and not in the orderProductTables
				orderProductTablesStore.setData(orderProductTables);

				//create the fields
				orderProductFields.map((item) => {
					if(item.name === 'id') {
						let input = FieldHidden.init({
							name: item.name,
							value: id,
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'input') {
						let input = FieldInput.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'dropdownSelect') {
						let dropdownSelect = FieldDropdownSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							selectItems: orderProductTablesStore.storageData[item.name]
						});
						this.formFields.appendChild(dropdownSelect.el);
					}
					if(item.type === 'multiSelect') {
						let multiSelect = FieldMultiSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							selectItems: orderProductTablesStore.storageData[item.name]
						});
						this.formFields.appendChild(multiSelect.el);
					}
					if(item.type === 'textarea') {
						let textarea = FieldTextarea.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
						});
						this.formFields.appendChild(textarea.el);
					}
				});
			});
		});
	},
	init: function(opts) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({ el: 
		`<div class="modal-window">
        <h3>Edit Order Product</h3>
        <form>
          <div id="form-fields">
          </div>
          <button action="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    `
		});

		//options
		// inst.source = opts.source;
		inst.onSuccess = opts.onSuccess;

		//elements
		inst.updateMessage = UpdateMessage.init({});
		const mainWindow = inst.el.querySelector('.main-window');
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);

		return inst;
	}
}

export default OrderProductEdit;