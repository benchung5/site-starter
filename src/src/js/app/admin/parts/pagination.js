import Component from '../../component';
import { toggleClass, setUrlParams } from '../../lib/utils';
import { globals } from '../../config';


var MyComp = {
	updateOffset: function(newOffset) {
		this.filterStore.setData({ offset: newOffset });
		setUrlParams('offset', newOffset);
		this.onUpdate();
	},
	back: function() {
		if(this.filterStore.storageData.offset === 0 ) { 
			return; 
		}
		let newOffset = this.filterStore.storageData.offset - globals.ADMIN_ENTRIES_PER_PAGE;
		this.updateOffset(newOffset);
	},
	advance: function() {
		if ((this.filterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= this.listStore.storageData.count) { 
			return; 
		}
		let newOffset = this.filterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE;
		this.updateOffset(newOffset);
	},
	updateControls: function() {
		//prev
		if(this.filterStore.storageData.offset === 0) {
			toggleClass(this.prev, 'disabled');
		}
		//next
		const end = ((this.filterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= this.listStore.storageData.count) ? true : false;
		if(end) {
			toggleClass(this.next, 'disabled');
		}
		//page
		this.page.innerHTML = this.filterStore.storageData.offset / globals.ADMIN_ENTRIES_PER_PAGE + 1;
		//count
		this.countEl.innerHTML = this.listStore.storageData.count;
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		//call initialize on Component first
		inst.initialize({
			el: 
			 `<div class="paginate-wrapper">
			   <div class="paginate" role="navigation" aria-label="Pagination">
			      <div class="paginate-previous">
			         <a aria-label="Previous page">
			         Previous
			         </a>
			      </div>
			      <div>Page <span id="page"></span></div>
			      <div class="paginate-next">
			         <a aria-label="Next page">
			         Next
			         </a>
			      </div>
			   </div>
			   <div class="records-count">(<span id="count"></span> records total)</div>
			</div>`
		});

		inst.prev = inst.el.querySelector('.paginate-previous');
		inst.prev.firstElementChild.addEventListener('click', inst.back.bind(inst), false);

		inst.next = inst.el.querySelector('.paginate-next')
		inst.next.firstElementChild.addEventListener('click', inst.advance.bind(inst), false);
		inst.page = inst.el.querySelector('#page');
		inst.countEl = inst.el.querySelector('#count');

		inst.filterStore = options.filterStore;
		inst.listStore = options.listStore;
		inst.onUpdate = options.onUpdate;

		//when the offset gets changed by another component or by this one
		inst.filterStore.addListener(inst.updateControls.bind(inst));
		inst.listStore.addListener(inst.updateControls.bind(inst));

		inst.updateControls();

		return inst;
	}
}

export default MyComp;
