import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import FieldAddImages from '../parts/fieldAddImages';
import FieldTextarea from '../parts/fieldTextarea';
import Sidebar from '../sidebar';
import { fetchArticleTables, addArticle } from '../../actions/articles';
import articleTablesStore from '../../storage/articleTablesStore';
import appStateStore from '../../storage/appStateStore';
import articleFields from './articleFields';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var ArticleAdd = {
	submitForm: function(e) {
		// e.preventDefault();
		// let formData = new FormData();
		// formData.append('mykey', 'myvalue');


		// prevent form from refreshing the page
		e.preventDefault();
		let formData = new FormData(e.target);

		// append new image data to formData
		this.fieldAddImages.state.croppedOut.map((item, index) => {
			formData.append('image'+'_'+index+'_original', item.originalFile);
			formData.append('image'+'_'+index+'_cropped', item.croppedFile);
			formData.append('image'+'_'+index+'_info', [item.tag_id, item.description]);
		});

		// //delete any empty fields in formData
		// for (let pair of formData.entries()) {
		// 	if (pair[1] == "") {
		// 		formData.delete(pair[0]);
		// 	}
		// }

		//delete any empty fields in formData
		Array.from(formData).map((item) => {
			if (item[1] == '') {
				formData.delete(item[0]);
			}
		});

		// //use this to log out formdata values
		// console.log(Array.from(formData));

		//form no longer touched
		appStateStore.setData({ formTouched: false })

		// call action to submit edited
		addArticle(formData, this.renderUpdated.bind(this));
	},
	clearMessages: function() {
	  this.submissionMessage.innerHTML = '';
	},
	onInputChange: function() {
		this.clearMessages();
	},
	renderUpdated: function(articleUpdated) {
		this.submissionMessage.innerHTML = '';
		this.submissionMessage.innerHTML = `<span>Article: ${articleUpdated.name}<br/>successfully added.</span>`;
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
                      <h3>Add Article</h3>
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

		//get article table data
		fetchArticleTables((articleTables) => {
			//use articleTablesStore because some values exist there statically and not in the articleTables
			articleTablesStore.setData(articleTables);

			//create the fields
			articleFields.map((item) => {
				if(item.type === 'input') {
					let input = FieldInput.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition
					});
					inst.formFields.appendChild(input.el);
				}
				if(item.type === 'dropdownSelect') {
					let dropdownSelect = FieldDropdownSelect.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
						selectItems: articleTablesStore.storageData[item.name]
					});
					inst.formFields.appendChild(dropdownSelect.el);
				}
				if(item.type === 'multiSelect') {
					let multiSelect = FieldMultiSelect.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
						selectItems: articleTablesStore.storageData[item.name]
					});
					inst.formFields.appendChild(multiSelect.el);
				}
				if(item.type === 'textarea') {
					let textarea = FieldTextarea.init({
						name: item.name,
						label: item.label,
						error: item.error,
						condition: item.condition,
					});
					inst.formFields.appendChild(textarea.el);
				}
			});

			//init fieldAddImages
			inst.fieldAddImages = FieldAddImages.init({
				tags: articleTablesStore.storageData['tags']
			});
			inst.formFields.appendChild(inst.fieldAddImages.el);
			inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		});

		return inst;
	}
}

export default ArticleAdd;