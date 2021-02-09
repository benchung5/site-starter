import Component from '../component';
import Loader from '../parts/loader';
import SideMenu from '../parts/sideMenu';
import Pagination from '../parts/pagination';
import { imgName } from '../lib/stringUtils';
//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH } = require('../config')[env];

var GridViewPlants = {
	buildItems: function() {
		this.cardsContainer.innerHTML = '';
		this.listStore.storageData.trees.map((item) => {
			let card = this.createEl(`
				<a href="/plants/${item.category}/${item.slug}" class="product-card" alt="${item.common_name}" data-slug="${item.slug}">
				    <div class="inner">
				        <div class="image">
				        	${/* image here */''}
				        </div>
				        <div class="info">
				            <div class="info-detail">${item.common_name}</div>
				        </div>
				    </div>
				</a>
			`);

			let image = null;

			if (item.images.length) {
				image = this.createEl(`
					<picture>
					    <source srcSet="${PLANTS_UPLOADS_PATH + imgName(item.images[0].name, 'medium')}" media="(max-width: 1275px)"/>
					    <source srcSet="${PLANTS_UPLOADS_PATH + imgName(item.images[0].name, 'medium')}"/>
					    <img alt="${item.images[0].description}" src="${PLANTS_UPLOADS_PATH + imgName(item.images[0].name, 'medium')}"/> 
					</picture>
				`);
			} else {
				image = this.createEl(`
					<picture>
					    <source srcSet="/assets/img/placeholder-images/placeholder-img.png" media="(max-width: 1275px)"/>
					    <source srcSet="/assets/img/placeholder-images/placeholder-img.png"/>
					    <img src="/assets/img/placeholder-images/placeholder-img.png"/> 
					</picture>
				`)
			}

			card.querySelector('.image').appendChild(image);
			this.cardsContainer.appendChild(card);
		});
	},
	init: function(options) {
		var proto = Object.assign({}, this, Component);
		var inst = Object.create(proto);
		// assign the instance constructor to the prototype so 'this' refers to the instance
		proto.constructor = inst;

		inst.gridView = inst.createEl(
			`<div>
                <div class="row">
                    <div class="small-12 columns">
                        ${/* optional title here */''}
                    </div>
                </div>
                <div class="row grid-view-inner">
                    <div class="left">
                    	${/* sideMenu */''}
                    </div>
                    <div class="right">
                        <div class="cards-container">
                        	${/* cards render here */''}
                        </div>
                        ${/* Pagination */''}
                    </div>
                </div>
            </div>`
		);

		inst.listStore = options.listStore;

		//build components
		inst.sideMenu = SideMenu.init({
			changeCategories: options.changeCategories,
			search: options.search,
			clearSearch: options.clearSearch,
			filterStore: options.filterStore,
			categories: options.categories
		});
		inst.gridView.querySelector('.left').appendChild(inst.sideMenu.el);
		inst.cardsContainer = inst.gridView.querySelector('.cards-container');

		inst.pagination = Pagination.init({
			listStore: options.listStore,
			filterStore: options.filterStore,
			updateOffset : options.updateOffset,
		});

		inst.gridView.querySelector('.right').appendChild(inst.pagination.el);

		inst.loader = Loader.init({
			children: inst.gridView
		});


		inst.initialize({});
		inst.el = inst.loader.el;

		inst.listStore.addListener(inst.buildItems.bind(inst));

		inst.buildItems();

		return inst;
	}
}

export default GridViewPlants;