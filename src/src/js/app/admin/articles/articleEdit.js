import Component from '../../component';
import FieldInput from '../parts/fieldInput';
import FieldDropdownSelect from '../parts/fieldDropdownSelect';
import FieldMultiSelect from '../parts/fieldMultiSelect';
import UploadedImages from '../parts/uploadedImages';
import FieldAddImages from '../parts/fieldAddImages';
import FieldTextarea from '../parts/fieldTextarea';
import Sidebar from '../sidebar';
import { fetchArticleTables, getArticle, updateArticle } from '../../actions/articles';
import articleTablesStore from '../../storage/articleTablesStore';
import appStateStore from '../../storage/appStateStore';
import { getUrlParams } from '../../lib/utils';
import articleFields from './articleFields';

//config
var { ADMIN_URL } = require('../../config')['globals'];

var ArticleEdit = {
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

		//append the current article id
		formData.append('article_id', this.articleId);

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

		// call action to submit edited
		updateArticle(formData, this.renderUpdated.bind(this));

		//form no longer touched
		appStateStore.setData({ formTouched: false })

		//clear deleted images
		this.uploadedImages.reset();
	},
	clearMessages: function() {
	  this.submissionMessage.innerHTML = '';
	},
	onInputChange: function() {
		this.clearMessages();
	},
	renderUpdated: function(articleUpdated) {
		this.submissionMessage.innerHTML = '';
		this.submissionMessage.innerHTML = `<span>Article: ${articleUpdated.name}<br/>successfully updated.</span>`;
	},
	onLoad: function() {
		//first clear the form fields
		this.formFields.innerHTML = '';

		//get the article data
		const article = getUrlParams('article')[0];
		getArticle(article, (apiData) => {
			//record the current article id
			this.articleId = apiData.id
			//create the fields
			articleFields.map((item) => {
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
						selectItems: articleTablesStore.storageData[item.name]
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
						selectItems: articleTablesStore.storageData[item.name]
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
				refType: 'articles'
			});
			this.formFields.appendChild(this.uploadedImages.el);

			//init fieldAddImages
			this.fieldAddImages = FieldAddImages.init({
				tags: articleTablesStore.storageData['tags']
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
                      <h3>Edit Article</h3>
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

		//get article table data
		fetchArticleTables((apiData) => {
			articleTablesStore.setData(apiData);
		});

		return inst;
	}
}

export default ArticleEdit;