import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldHidden from '../parts/fieldHidden';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldTextarea from '../parts/fieldTextarea';
import UploadedImages from '../parts/uploadedImages';
import FieldAddImages from '../parts/fieldAddImages';
import Sidebar from '../sidebar';
import { fetchProductTables, getProduct, updateProduct } from '../../actions/products';
import productTablesStore from '../../storage/productTablesStore';
import appStateStore from '../../storage/appStateStore';
import { getUrlParams } from '../../lib/utils';
import productFields from './productFields';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

var ProductEditPage = {
	submitForm: function(e) {
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', item.tag_id + '|||' + item.description + '|||' + item.caption);
		});

		//append the current product id
		formData.append('id', this.productId);

		let hasErrors = checkFieldErrors(e.target, productFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			updateProduct(formData, this.renderUpdated.bind(this));
			appStateStore.setData({ formTouched: false });
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
			this.updateMessage.renderSuccess(`Product id: ${response.id}<br/>successfully updated.`);
		}
	},
	onLoad: function() {
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		const productId = getUrlParams('product')[0];
		getProduct(productId, (product) => {
			fetchProductTables((productTables) => {
				productTablesStore.setData(productTables);

				this.productId = product.id;

				productFields.map((item) => {
					if(item.name === 'id') {
						let input = FieldHidden.init({
							name: item.name,
							value: product.id,
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'input') {
						let input = FieldInput.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: product[item.name],
						});
						this.formFields.appendChild(input.el);
					}
					if(item.type === 'dropdownSelect') {
						let dropdownSelect = FieldDropdownSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							selectItems: productTablesStore.storageData[item.name],
							value: product[item.name],
						});
						this.formFields.appendChild(dropdownSelect.el);
					}
					if(item.type === 'multiSelect') {
						let value = product[item.name];
						if (item.name === 'source_ids') {
							value = product.sources || [];
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
							value: product[item.name],
						});
						this.formFields.appendChild(textarea.el);
					}
				});

				this.uploadedImages = UploadedImages.init({
					onChange: this.onInputChange.bind(this),
					images: product.images || [],
					refType: 'products'
				});
				this.formFields.appendChild(this.uploadedImages.el);

				this.fieldAddImages = FieldAddImages.init({
					tags: [{ id: '', name: 'none' }]
				});
				this.formFields.appendChild(this.fieldAddImages.el);
			});
		});
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		proto.constructor = inst;

		inst.initialize({ el: 
		`<div class="admin-main">
              <div class="row">
                  <div class="main-window columns small-12 large-9">
                      <h3>Edit Product</h3>
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

		inst.sidebar = Sidebar.init({});
		inst.updateMessage = UpdateMessage.init({});
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);
		inst.el.querySelector('.main-window').before(inst.sidebar.el);

		return inst;
	}
}

export default ProductEditPage;
