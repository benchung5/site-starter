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
import { checkFieldErrors } from '../../lib/formUtils';
import UpdateMessage from '../parts/updateMessage';

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
		// Array.from(formData).map((item) => {
		// 	if (item[1] == '') {
		// 		formData.delete(item[0]);
		// 	}
		// });

		let hasErrors = checkFieldErrors(e.target, articleFields);

		if(hasErrors) {
			this.updateMessage.renderError(`<span>please fill in all required fields</span>`);
		} else {
			// call action to submit edited
			updateArticle(formData, this.renderUpdated.bind(this));

			//form no longer touched
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
			this.updateMessage.renderSuccess(`Article: ${response.name}<br/>successfully updated.`);
		}
	},
	onLoad: function() {
		//first clear the form fields
		this.formFields.innerHTML = '';
		this.updateMessage.clear();

		//get the article data
		const article = getUrlParams('article')[0];
		getArticle(article, (apiData) => {
			//update the link to the live article
			this.link.href = `/articles/${apiData.categories[0].slug}/${apiData.slug}`;
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
                      <a id="link" style="float: right; display: inline-block;" target="_blank">&nbsp;&nbsp;view article</a>
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
		inst.mainWindow = inst.el.querySelector('.main-window');
		inst.mainWindow.before(inst.sidebar.el);
		inst.formFields = inst.el.querySelector('#form-fields');
		inst.link = inst.el.querySelector('#link');
		inst.form = inst.el.querySelector('form');
		inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		inst.form.after(inst.updateMessage.el);

		//get article table data
		fetchArticleTables((apiData) => {
			articleTablesStore.setData(apiData);
		});

		return inst;
	}
}

export default ArticleEdit;