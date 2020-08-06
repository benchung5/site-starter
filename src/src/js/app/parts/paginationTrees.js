import Component from '../component';
import { globals } from '../config';
import treesFilterStore from '../storage/treesFilterStore';
import plantListStore from '../storage/plantListStore';
import { toggleClass } from '../lib/utils';
import { getUrlParams, setUrlParams } from '../lib/utils';
import { searchTrees } from '../actions/plants';

var MyComp = {
	updateOffset: function(newOffset) {
		treesFilterStore.setData({ offset: newOffset });

		//search trees
		searchTrees(treesFilterStore.storageData, (apiData) => {
			plantListStore.setData(apiData);

			this.update();
			setUrlParams('offset', newOffset);
		});
	},
	back: function() {
		if(treesFilterStore.storageData.offset === 0 ) { 
			return; 
		}
		let newOffset = treesFilterStore.storageData.offset - globals.ADMIN_ENTRIES_PER_PAGE;
		this.updateOffset(newOffset);
	},
	advance: function() {

		if ((treesFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= plantListStore.storageData.count) { 
			return; 
		}
		let newOffset = treesFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE;
		this.updateOffset(newOffset);
	},
	update: function() {
		//prev
		if(treesFilterStore.storageData.offset === 0) {
			toggleClass(this.prev, 'disabled');
		}
		//next
		const end = ((treesFilterStore.storageData.offset + globals.ADMIN_ENTRIES_PER_PAGE) >= plantListStore.storageData.count) ? true : false;
		if(end) {
			toggleClass(this.next, 'disabled');
		}
		//page
		this.page.innerHTML = treesFilterStore.storageData.offset / globals.ADMIN_ENTRIES_PER_PAGE + 1;
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

		// get offset from url
		const offset = getUrlParams('offset');
		if (offset) {
		  inst.updateOffset(offset);
		} else {
			inst.update();
		}

		return inst;
	}
}

export default MyComp;