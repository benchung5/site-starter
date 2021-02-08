import Component from '../component';
import { toggleClass } from '../lib/utils';


var MyComp = {
	back: function() {
		if(this.filterStore.storageData.offset === 0 ) { 
			return; 
		}
		let newOffset = this.filterStore.storageData.offset - this.entriesPerPage;
		this.updateOffset(newOffset);
	},
	advance: function() {
		if ((this.filterStore.storageData.offset + this.entriesPerPage) >= this.listStore.storageData.count) { 
			return; 
		}
		let newOffset = this.filterStore.storageData.offset + this.entriesPerPage;
		this.updateOffset(newOffset);
	},
	updateControls: function() {
		//prev
		if(this.filterStore.storageData.offset === 0) {
			toggleClass(this.prev, 'disabled');
		}
		//next
		const end = ((this.filterStore.storageData.offset + this.entriesPerPage) >= this.listStore.storageData.count) ? true : false;
		if(end) {
			toggleClass(this.next, 'disabled');
		}
		//page
		this.page.innerHTML = this.filterStore.storageData.offset / this.entriesPerPage + 1;
		//count
		this.count.innerHTML = this.listStore.storageData.count;
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
		inst.count = inst.el.querySelector('#count');

		inst.filterStore = options.filterStore;
		inst.entriesPerPage = options.entriesPerPage;
		inst.listStore = options.listStore;
		inst.updateOffset = options.updateOffset;

		//when the offset gets changed by another component or by this one
		inst.filterStore.addListener(inst.updateControls.bind(inst));

		inst.updateControls();

		return inst;
	}
}

export default MyComp;