import Component from '../component';
import { globals } from '../config';
import plantFilterStore from '../storage/plantFilterStore';
import plantListStore from '../storage/plantListStore';
import { toggleClass } from '../lib/utils';
import { setUrlParams } from '../lib/utils';
import { searchTrees } from '../actions/plants';

var MyComp = {
	back: function() {
		if(plantFilterStore.storageData.offset === 0 ) { 
			return; 
		}
		let newOffset = plantFilterStore.storageData.offset - globals.ADMIN_ENTRIES_PER_PAGE;
		this.update(newOffset);
	},
	advance: function() {
		if ((plantFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= plantListStore.storageData.count) { 
			return; 
		}
		let newOffset = plantFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE;
		this.update(newOffset);
	},
	update: function(newOffset) {
		plantFilterStore.setData({ offset: newOffset });
		setUrlParams('offset', newOffset);
		//search trees
		searchTrees(plantFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);
		});
	},
	updateControls: function() {
		//prev
		if(plantFilterStore.storageData.offset === 0) {
			toggleClass(this.prev, 'disabled');
		}
		//next
		const end = ((plantFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= plantListStore.storageData.count) ? true : false;
		if(end) {
			toggleClass(this.next, 'disabled');
		}
		//page
		this.page.innerHTML = plantFilterStore.storageData.offset / globals.ADMIN_ENTRIES_PER_PAGE + 1;
		//count
		this.count.innerHTML = plantListStore.storageData.count;
	},
	init: function() {
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

		//when the offset gets changed by another component or by this one
		plantFilterStore.addListener(inst.updateControls.bind(inst));

		// // get offset from url
		// const offset = getUrlParams('offset');
		// if (offset) {
		//   inst.updateOffset(parseInt(offset[0]));
		// } else {
		// 	inst.update();
		// }

		inst.updateControls();

		return inst;
	}
}

export default MyComp;