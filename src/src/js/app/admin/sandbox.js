import Component from '../component';
import { getData } from '../actions/sandbox';
import Sidebar from './sidebar';


var Sandbox = {
	onLoad: function() {
		let data = getData((apiData) => {
			this.sandbox.innerHTML = apiData;
		});
		
	},
	init: function(opts) {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({ el: 
		`<div class="admin-main">
          <div class="row">
              <div class="main-window columns small-12 large-9">
								<div id="sandbox-data">
								</div>
              </div>
          </div>
      </div>`
		});

		inst.sidebar = Sidebar.init({});
		const mainWindow = inst.el.querySelector('.main-window');
		mainWindow.before(inst.sidebar.el);
		inst.sandbox = inst.el.querySelector('#sandbox-data');

		// //options
		// inst.onSuccess = opts.onSuccess;

		// //elements
		// inst.updateMessage = UpdateMessage.init({});
		// const mainWindow = inst.el.querySelector('.main-window');
		// inst.formFields = inst.el.querySelector('#form-fields');
		// inst.form = inst.el.querySelector('form');
		// inst.form.addEventListener('submit', inst.submitForm.bind(inst));
		// inst.formFields.addEventListener('focus', () => { appStateStore.setData({ formTouched: true }) }, true);
		// inst.form.after(inst.updateMessage.el);

		return inst;
	}
}

export default Sandbox;