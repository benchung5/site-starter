import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import UploadedImages from '../parts/uploadedImages';
import FieldAddImages from '../parts/fieldAddImages';
import FieldTextarea from '../parts/fieldTextarea';
import Sidebar from '../sidebar';
import { fetchPlantTables, getPlant, updatePlant } from '../../actions/plants';
import plantTablesStore from '../../storage/plantTablesStore';
import appStateStore from '../../storage/appStateStore';
import { getUrlParams } from '../../lib/utils';
import plantFields from './plantFields';
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var PlantEdit = {
	submitForm: function(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			// //check to make sure the source image hasn't changed since we 
			// //read the dropped in file (readAsDataURL in crop.js)
			// let img = new Image();
			// img.src = URL.createObjectURL(item.originalFile);
			// img.onload = () => {
			//   document.querySelector(".admin-main").appendChild(img);
			// }
			
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', item.tag_id + '|||' + item.description + '|||' + item.caption);
		});

		//append the current plant id
		formData.append('tree_id', this.plantId);

		// //delete any empty fields in formData
		// Array.from(formData).map((item) => {
		// 	if (item[1] == '') {
		// 		formData.delete(item[0]);
		// 	}
		// });

		//handle field errors
		let hasErrors = checkFieldErrors(e.target, plantFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			// call action to submit edited
			updatePlant(formData, this.renderUpdated.bind(this));

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
			this.updateMessage.renderSuccess(`Tree: ${response.common_name}<br/>successfully updated.`);
		}
	},
	onLoad: function() {
		//first clear the form
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		//get the plant data
		const plant = getUrlParams('plant')[0];
		getPlant(plant, (apiData) => {
			//get plant table data
			fetchPlantTables((plantTablesData) => {
				plantTablesStore.setData(plantTablesData);

				//update the link to the live article
				this.link.href = `/plants/${apiData.trees_category.slug}/${apiData.slug}`;
				//record the current plant id
				this.plantId = apiData.id
				//create the fields
				plantFields.map((item) => {
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
					if(item.type === 'dropdownSelect') {
						let dropdownSelect = FieldDropdownSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name],
							selectItems: plantTablesStore.storageData[item.name]
						});
						this.formFields.appendChild(dropdownSelect.el);
					}
					if(item.type === 'multiSelect') {
						console.log('multiselect: ', apiData[item.name]);
						let multiSelect = FieldMultiSelect.init({
							name: item.name,
							label: item.label,
							error: item.error,
							condition: item.condition,
							value: apiData[item.name],
							selectItems: plantTablesStore.storageData[item.name]
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

				//init UploadedImages
				this.uploadedImages = UploadedImages.init({
					onChange: this.onInputChange.bind(this),
					images: apiData.images,
					refType: 'trees'
				});
				this.formFields.appendChild(this.uploadedImages.el);

				//init fieldAddImages
				this.fieldAddImages = FieldAddImages.init({
					tags: plantTablesStore.storageData['tags']
				});
				this.formFields.appendChild(this.fieldAddImages.el);

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
                      <h3>Edit Plant</h3>
                      <a id="link" style="float: right; display: inline-block;" target="_blank">&nbsp;&nbsp;view plant</a>
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
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.link = inst.el.querySelector('#link');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);

		return inst;
	}
}

export default PlantEdit;