import Component from '../component';
import Loader from '../parts/loader';
import SideMenuArticles from './sideMenuArticles';
import articleListStore from '../storage/articleListStore';
import PaginationArticles from '../parts/paginationArticles';
import { imgName } from '../lib/stringUtils';
//config
const env = process.env.NODE_ENV || "development";
var { ARTICLES_UPLOADS_PATH } = require('../config')[env];

var GridViewArticles = {
	buildItems: function() {
		this.cardsContainer.innerHTML = '';
		let card = null;
		if(articleListStore.storageData.articles.length == 0) {
			card = this.createEl(`
				<div class="article-row">
				    <div class="inner">
				    	<div class="info">Sorry, not items found.</info>
				    </div>
				</div>
			`);
		} else {
			articleListStore.storageData.articles.map((item) => {
				// remove html and trim
				let body = item.body.replace(/<[^>]*>?/gm, '');
				body = body.substring(0, 250) + '...';

				card = this.createEl(`
					<a href="/articles/${item.categories.split(',')[0]}/${item.slug}" class="article-row" alt="${item.name}" data-slug="${item.slug}">
					    <div class="inner">
					        <div class="image">
					        	${/* image here */''}
					        </div>
					        <div class="info">
					            <div class="info-body">
					            	<h2 class="article-title">${item.name}</h2>
					            	<p class="article-body">${body}</p>
					            </div>
					            <div class="info-footer">read more&nbsp; &#8594;</div>
					        </div>
					    </div>
					</a>
				`);

				let image = null;

				if (item.featured_image) {
					image = this.createEl(`
						<picture>
						    <source srcSet="${ARTICLES_UPLOADS_PATH + imgName(item.featured_image, 'medium')}" media="(max-width: 1275px)"/>
						    <source srcSet="${ARTICLES_UPLOADS_PATH + imgName(item.featured_image, 'medium')}"/>
						    <img alt="${item.image_description}" src="${ARTICLES_UPLOADS_PATH + imgName(item.featured_image, 'medium')}"/> 
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
			});
		}
		this.cardsContainer.appendChild(card);
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
                    	${/* sideMenuArticles */''}
                    </div>
                    <div class="right">
                        <div class="articles-container">
                        	${/* cards render here */''}
                        </div>
                        ${/* paginationArticles */''}
                    </div>
                </div>
            </div>`
		);

		//build components
		inst.sideMenuArticles = SideMenuArticles.init();
		inst.gridView.querySelector('.left').appendChild(inst.sideMenuArticles.el);
		inst.cardsContainer = inst.gridView.querySelector('.articles-container');
		inst.paginationArticles = PaginationArticles.init();
		inst.gridView.querySelector('.right').appendChild(inst.paginationArticles.el);

		inst.loader = Loader.init({
			children: inst.gridView
		});


		inst.initialize({});
		inst.el = inst.loader.el;

		articleListStore.addListener(inst.buildItems.bind(inst));

		return inst;
	}
}

export default GridViewArticles;