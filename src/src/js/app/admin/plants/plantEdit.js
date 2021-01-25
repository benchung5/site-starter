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

//config
var { ADMIN_URL } = require('../../config')['globals'];

var PlantEdit = {
	submitForm: function(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', item.tag_id + '|||' + item.description + '|||' + item.caption);
		});

		//append the current plant id
		formData.append('tree_id', this.plantId);

		//delete any empty fields in formData
		Array.from(formData).map((item) => {
			if (item[1] == '') {
				formData.delete(item[0]);
			}
		});

		//log out the values
		console.log(Array.from(formData));


		// call action to submit edited
		updatePlant(formData, this.renderUpdated.bind(this));

		//form no longer touched
		appStateStore.setData({ formTouched: false })
	},
	clearMessages: function() {
	  this.submissionMessage.innerHTML = '';
	},
	onInputChange: function() {
		this.clearMessages();
	},
	renderUpdated: function(treeUpdated) {
		this.submissionMessage.innerHTML = '';
		this.submissionMessage.innerHTML = `<span>Tree: ${treeUpdated.common_name}<br/>successfully updated.</span>`;
	},
	onLoad: function() {
		//first clear the form fields
		this.formFields.innerHTML = '';

		//get the plant data
		const plant = getUrlParams('plant')[0];
		getPlant(plant, (apiData) => {
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
                      <form>
	                      <div id="form-fields">
	                      </div>
	                      <button action="submit" class="btn btn-primary">Submit</button>
                      </form>
                      <div class="submission-message">
                      </div>
                  </div>
              </div>
          </div>
	      `
		});

		//build
		inst.sidebar = Sidebar.init();
		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.submissionMessage = inst.el.querySelector('.submission-message');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);

		//get plant table data
		fetchPlantTables((apiData) => {
			plantTablesStore.setData(apiData);
		});

		return inst;
	}
}

export default PlantEdit;