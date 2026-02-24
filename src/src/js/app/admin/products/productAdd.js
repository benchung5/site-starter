import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldTextarea from '../parts/fieldTextarea';
import FieldAddImages from '../parts/fieldAddImages';
import { fetchProductTables, addProduct } from '../../actions/products';
import productTablesStore from '../../storage/productTablesStore';
import appStateStore from '../../storage/appStateStore';
import productFields from './productFields';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

var ProductAdd = {
	submitForm: function(e) {
		// prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', item.tag_id + '|||' + item.description + '|||' + item.caption);
		});

		//delete any empty fields in formData
		Array.from(formData).map((item) => {
			if (item[1] == '') {
				formData.delete(item[0]);
			}
		});

		// //use this to log out formdata values
		// console.log(Array.from(formData));

		//handle field errors
		let hasErrors = checkFieldErrors(e.target, productFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			//form no longer touched
			appStateStore.setData({ formTouched: false });

			// call action to submit edited
			addProduct(formData, this.renderUpdated.bind(this));

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
	buildFromSource: function(source) {
		//first clear the form fields
		this.formFields.innerHTML = '';
		this.updateMessage.clear();
		this.presetSources = [{ id: source }];

		//get product table data
		fetchProductTables((productTables) => {
			//use productTablesStore because some values exist there statically and not in the productTables
			productTablesStore.setData(productTables);

			//create the fields
			productFields.map((item) => {
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
						selectItems: productTablesStore.storageData[item.name]
					});
					this.formFields.appendChild(dropdownSelect.el);
				}
				if(item.type === 'multiSelect') {
					let value = null;
					if (item.name === 'source_ids') {
						value = this.presetSources;
					}
					let multiSelect = FieldMultiSelect.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
						selectItems: productTablesStore.storageData[item.name],
						value: value,
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

			//init fieldAddImages (products don't use tags)
			this.fieldAddImages = FieldAddImages.init({
				tags: [{ id: '', name: 'none' }]
			});
			this.formFields.appendChild(this.fieldAddImages.el);
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
        <h3>Add Product</h3>
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

export default ProductAdd;