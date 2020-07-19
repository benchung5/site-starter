import Component from '../component';

var Dashboard = {
	init: function() {
		var proto = Object.assign({}, this, Component)
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el:
			`<div className="admin-main">
               <div className="row">
                    <Sidebar/>
                    <div className="main-window columns small-12 large-9">
                        <h1 className="margin-bottom">Dashboard</h1>
                        Admin Area. <br/>
                        Welcome <span id="user"></span>
                    </div>
                </div>	
            </div>`
		});

		return inst;
	}
}

export default Dashboard;