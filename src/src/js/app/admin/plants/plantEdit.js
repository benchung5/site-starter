import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import UploadedImages from '../parts/uploadedImages';
import Sidebar from '../sidebar';
import { signInUser } from '../../actions/users';
import { fetchPlantTables, getPlant, updatePlant } from '../../actions/plants';
import plantTablesStore from '../../storage/plantTablesStore';
import { getUrlParams } from '../../lib/utils';
import plantFields from './plantFields';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var PlantEdit = {
	submitForm(e) {
		//prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		console.log(Array.from(formData));

		// let formpropsClone = [];

		// formpropsClone = formatOutFormFields(formData, [
		//         'origins', 
		//         'eco_benefits',
		//         'native_to',
		//         'shapes', 
		//         'light', 
		//         'soil', 
		//         'natural_habitat', 
		//         'common_uses', 
		//         'transplanting', 
		//         'unique_attractions', 
		//         'tolerances',
		//         'insects',
		//         'diseases',
		//     ]);

		// // call action to submit edited
		// updatePlant(createImgFormData('new_images', formpropsClone));
		// //clear deleted images
		// this.uploadedImages.reset();
	},
	// formatToMultiselect: function(inArray) {
	//     return inArray.map((item) => {
	//         return item.id;
	//     });
	// },
	clearMessages: function() {
	  //this.props.clearUpdateTree();
	},
	onInputChange: function() {
		this.clearMessages();
	},
	renderUpdated: function() {
		this.submissionMessage.innerHTML = '';
		this.submissionMessage.innerHTML = `<span>Tree: ${treeUpdated.common_name}<br/>successfully updated.</span>`;
	},
	onLoad: function() {
		//first clear the form fields
		this.formFields.innerHTML = '';

		//get the plant data
		const plant = getUrlParams('plant')[0];
		getPlant(plant, (apiData) => {
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
			});

			//init images on UploadedImages component
			this.uploadedImages = UploadedImages.init({
				onChange: this.onInputChange.bind(this),
				images: apiData.images,
				refType: 'trees'
			});
			this.formFields.appendChild(this.uploadedImages.el);
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
                      <div className="submission-message">
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

		//get plant table data
		fetchPlantTables((apiData) => {
			plantTablesStore.setData(apiData);
		});

		return inst;
	}
}

export default PlantEdit;