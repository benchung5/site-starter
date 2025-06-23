import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldHidden from '../parts/fieldHidden';
// import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import orderProductTablesStore from '../../storage/orderProductTablesStore';
import appStateStore from '../../storage/appStateStore';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';
// import { printShippingLabel } from '../../actions/shipping';

var ShippingLabel = {
	submitForm: function(e) {
		// prevent form from refreshing the page
		e.preventDefault();

		//set the form redirect
		//must do it this way and navigate to the actual page url on post for php to force the pdf download
		this.form.method = 'POST';
		this.form.action = '/shipment/download_shipping_label';

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
		let hasErrors = checkFieldErrors(e.target, this.state.fields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {

			this.form.submit();
			appStateStore.setData({ formTouched: false });
			this.updateMessage.clear();
			this.onSuccess();
		}
	},
	onInputChange: function() {
		this.updateMessage.clear();
	},
	buildFromOrder: function(orderId) {
		//first clear the form fields
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

			//create the fields
			this.state.fields.map((item) => {
				if(item.type === 'hiddenField') {
					let input = FieldHidden.init({
						name: item.name,
						value: orderId,
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
        <h3>Print Shipping Label</h3>
        <form>
          <div id="form-fields">
          </div>
          <button action="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    `
		});

		//options
		inst.onSuccess = opts.onSuccess;

		//set the fields
		inst.setState({ 
			fields: [
				{name: 'order_id', type: 'hiddenField', error: null, condition: null},
				{name: 'weight', label: 'weight', type: 'input', error: 'Please enter a weight', condition: 'required'},
				{name: 'length', label: 'length', type: 'input', error: 'Please enter a length', condition: 'required'},
				{name: 'width', label: 'width', type: 'input', error: 'Please enter a width', condition: 'required'},
				{name: 'height', label: 'height', type: 'input', error: 'Please enter a height', condition: 'required'},
			] 
		});

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

export default ShippingLabel;