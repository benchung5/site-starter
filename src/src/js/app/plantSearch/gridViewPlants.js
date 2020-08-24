import Component from '../component';
import Loader from '../parts/loader';
import SideMenuPlants from './sideMenuPlants';
import plantListStore from '../storage/plantListStore';
import PaginationPlants from '../parts/paginationPlants';
import { imgName } from '../lib/stringUtils';
//config
const env = process.env.NODE_ENV || "development";
var { PLANTS_UPLOADS_PATH } = require('../config')[env];

var GridViewPlants = {
	buildItems: function() {
		this.cardsContainer.innerHTML = '';
		plantListStore.storageData.trees.map((item) => {
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

			if (item.images) {
				image = this.createEl(`
					<picture>
					    <source srcSet="${PLANTS_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}" media="(max-width: 1275px)"/>
					    <source srcSet="${PLANTS_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}"/>
					    <img alt="${item.image_descriptions.split(',')[0]}" src="${PLANTS_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}"/> 
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
	init: function() {
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
                    <div class="left show-for-large">
                    	${/* sideMenuPlants */''}
                    </div>
                    <div class="right">
                        <div class="cards-container">
                        	${/* cards render here */''}
                        </div>
                        ${/* paginationPlants */''}
                    </div>
                </div>
            </div>`
		);

		//build components
		inst.sideMenuPlants = SideMenuPlants.init();
		inst.gridView.querySelector('.left').appendChild(inst.sideMenuPlants.el);
		inst.cardsContainer = inst.gridView.querySelector('.cards-container');
		inst.paginationPlants = PaginationPlants.init();
		inst.gridView.querySelector('.right').appendChild(inst.paginationPlants.el);

		inst.loader = Loader.init({
			children: inst.gridView
		});


		inst.initialize({});
		inst.el = inst.loader.el;

		plantListStore.addListener(inst.buildItems.bind(inst));

		return inst;
	}
}

export default GridViewPlants;