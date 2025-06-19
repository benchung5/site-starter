import Component from '../component';
import { getData } from '../actions/sandbox';
import Sidebar from './sidebar';
const env = process.env.NODE_ENV || "development";
var { DOMAIN_URL } = require('../config')[env];


var Sandbox = {
	onLoad: function() {
		let data = getData((apiData) => {
			this.sandbox.innerHTML = apiData;
		});
		
	},
	onPrintClick(e) {
		e.preventDefault();

		let w = window.open();
		w.document.write('<html><head><link href="/assets/css/admin.css" rel="stylesheet" type="text/css"></head><body class="sandbox-body-print">');
		w.document.write(this.sandbox.innerHTML);
		w.document.write('</body></html>');
		w.print();
		w.close();
	
		// let w = window.open(`${DOMAIN_URL}/sandbox`, "_blank", "width=800,height=600");
		// w.addEventListener("load", () => {
		// 	w.document.write('<html><head><link href="/assets/css/admin.css" rel="stylesheet" type="text/css"></head><body class="sandbox-body-print">');
		// 	w.document.write(this.sandbox.innerHTML);
		// 	w.document.write('</body></html>');
		//     w.print();
		// });
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
								<a id="print">print</a>
								<div id="sandbox-data">
								</div>
              </div>
          </div>
      </div>`
		});

		inst.sidebar = Sidebar.init({});
		inst.mainWindow = inst.el.querySelector('.main-window');
		inst.mainWindow.before(inst.sidebar.el);
		inst.sandbox = inst.el.querySelector('#sandbox-data');
		inst.printButton = inst.el.querySelector('#print');
		inst.printButton.addEventListener('click', inst.onPrintClick.bind(inst));

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