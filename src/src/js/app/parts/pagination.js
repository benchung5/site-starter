import Component from '../component';
import { addClass, removeClass, setUrlParams } from '../lib/utils';
import { globals } from '../config';

var Pagination = {
	updateOffset: function(newOffset) {
		this.filterStore.setData({ offset: newOffset });
		setUrlParams('offset', newOffset);
		this.onUpdate();
	},
	getPerPage: function() {
		return this.filterStore.storageData.limit || this.listStore.storageData.limit || globals.ADMIN_ENTRIES_PER_PAGE;
	},
	getPageCount: function() {
		const perPage = this.getPerPage();
		const total = this.listStore.storageData.count || 0;
		return Math.max(1, Math.ceil(total / perPage));
	},
	getCurrentPage: function() {
		const perPage = this.getPerPage();
		const offset = this.filterStore.storageData.offset || 0;
		return Math.floor(offset / perPage) + 1;
	},
	goToPage: function(page) {
		const pageCount = this.getPageCount();
		if (page < 1 || page > pageCount) {
			return;
		}
		const perPage = this.getPerPage();
		const newOffset = (page - 1) * perPage;
		this.updateOffset(newOffset);
	},
	back: function() {
		this.goToPage(this.getCurrentPage() - 1);
	},
	advance: function() {
		this.goToPage(this.getCurrentPage() + 1);
	},
	buildPageRange: function(pageCount, currentPage) {
		if (pageCount <= 7) {
			return Array.from({ length: pageCount }, (_, index) => index + 1);
		}

		const pages = [];
		const start = Math.max(2, currentPage - 1);
		const end = Math.min(pageCount - 1, currentPage + 1);

		pages.push(1);
		if (start > 2) {
			pages.push('...');
		}

		for (let page = start; page <= end; page += 1) {
			pages.push(page);
		}

		if (end < pageCount - 1) {
			pages.push('...');
		}
		pages.push(pageCount);

		return pages;
	},
	renderPages: function(pageCount, currentPage) {
		this.list.innerHTML = '';

		const prevItem = this.createEl(
			`<li class="pagination-previous">
				<a href="#" aria-label="Previous page">
					<svg class="pagination-arrow pagination-arrow--prev" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path d="M14.5 6.5L9 12l5.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</a>
			</li>`
		);
		prevItem.querySelector('a').addEventListener('click', (e) => {
			e.preventDefault();
			this.back();
		});
		this.list.appendChild(prevItem);

		const pages = this.buildPageRange(pageCount, currentPage);
		pages.forEach((page) => {
			if (page === '...') {
				this.list.appendChild(this.createEl('<li class="pagination-ellipsis" aria-hidden="true"></li>'));
				return;
			}

			if (page === currentPage) {
				this.list.appendChild(
					this.createEl(
						`<li class="current"><span aria-current="page">${page}</span></li>`
					)
				);
				return;
			}

			const pageItem = this.createEl(
				`<li><a href="#" aria-label="Page ${page}">${page}</a></li>`
			);
			pageItem.querySelector('a').addEventListener('click', (e) => {
				e.preventDefault();
				this.goToPage(page);
			});
			this.list.appendChild(pageItem);
		});

		const nextItem = this.createEl(
			`<li class="pagination-next">
				<a href="#" aria-label="Next page">
					<svg class="pagination-arrow pagination-arrow--next" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path d="M14.5 6.5L9 12l5.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</a>
			</li>`
		);
		nextItem.querySelector('a').addEventListener('click', (e) => {
			e.preventDefault();
			this.advance();
		});
		this.list.appendChild(nextItem);

		if (currentPage === 1) {
			addClass(prevItem, 'disabled');
		} else {
			removeClass(prevItem, 'disabled');
		}

		if (currentPage === pageCount) {
			addClass(nextItem, 'disabled');
		} else {
			removeClass(nextItem, 'disabled');
		}
	},
	updateControls: function() {
		const pageCount = this.getPageCount();
		const currentPage = this.getCurrentPage();

		this.wrapper.style.display = pageCount <= 1 ? 'none' : '';

		this.renderPages(pageCount, currentPage);
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.initialize({
			el: 
			 `<div class="pagination-wrapper">
			   <nav role="navigation" aria-label="Pagination">
			      <ul class="pagination"></ul>
			   </nav>
			</div>`
		});

		inst.wrapper = inst.el;
		inst.list = inst.el.querySelector('ul');

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

export default Pagination;