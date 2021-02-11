import Component from '../component';
import Sidebar from './sidebar';

var Dashboard = {
	build: function() {
		this.el.querySelector('.main-window').before(this.sidebar.el);
	},
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el:
			`<div class="admin-main">
               <div class="row">
                    <div class="main-window columns small-12 large-9">
                        <h3>Dashboard</h3>
                        Welcome <span id="user"></span>
                    </div>
                </div>	
            </div>`
		});

		inst.sidebar = Sidebar.init({});

		inst.build()

		return inst;
	}
}

export default Dashboard;