import Component from '../../component';
import { getSingle, deleteArticle, resetFilter, searchArticles, updateFilterFromUrl } from '../../actions/articles';
import Sidebar from '../sidebar';
import Search from '../parts/search';
import Pagination from '../parts/pagination';
import articleListStore from '../../storage/articleListStore';
import articleFilterStore from '../../storage/articleFilterStore';
import { globals } from '../../config';
import verifyAction from '../parts/verifyAction';

var ArticlesList = {
	build: function() {
		const mainWindow = this.el.querySelector('.main-window');
		mainWindow.before(this.sidebar.el);
		this.itemList = this.el.querySelector('.item-list');
		this.itemList.before(this.search.el);
		mainWindow.appendChild(this.pagination.el);
	},
	onDeleteArticleClick: function(e) {
		e.preventDefault();
		this.verifyAction.open((verified) => {
			if(verified) {
				let slug = e.target.getAttribute("data-slug");
				let id = e.target.getAttribute("data-id");
				deleteArticle({'article': { id: parseInt(id), slug: slug}}, (apiData) => {
					//perform the article search again
					searchArticles(articleFilterStore.storageData, (apiData) => {
						articleListStore.setData(apiData);
					});
				});
			}
		});
	},
	onUpdate: function() {
		//search articles
		searchArticles(articleFilterStore.storageData, (apiData) => {
			articleListStore.setData(apiData);
		});
	},
	onPageChange: function() {
		//reset the filter settings first
		resetFilter(() => {});
	},
	renderList: function() {
		this.itemList.innerHTML = '';

		articleListStore.storageData.articles.map((article) => {
			let el = this.createEl(
			   `<li className="list-group-item">
			        <span>${article.name}</span>
			        <a id="delete" href="" data-id=${article.id} data-slug=${article.slug}>Delete</a>
			        <a href="/${globals.ADMIN_URL}#article-edit?article=${article.slug}">edit</Link>
			    </li>`);

				el.querySelector('#delete').addEventListener('click', this.onDeleteArticleClick.bind(this), false);

			    this.itemList.appendChild(el);
		});
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
                        <h3>Articles</h3>
                        <ul class="list-group item-list">
                        </ul>
                    </div>
                </div>
            </div>`
		});

		inst.sidebar = Sidebar.init({
			onPageChange: inst.onPageChange.bind(inst),
		});
		inst.search = Search.init({
			filterStore: articleFilterStore,
			onUpdate: inst.onUpdate.bind(inst)
		});
		inst.pagination = Pagination.init({
			filterStore: articleFilterStore,
			listStore: articleListStore,
			onUpdate: inst.onUpdate.bind(inst),
		});
		inst.verifyAction = verifyAction.init({
			message: 'delete item?'
		});

		inst.build();

		//get the filter settings from the url
		updateFilterFromUrl(() => {
			inst.renderList();
		});
		
		//listen for updated articlelistStore
		articleListStore.addListener(inst.renderList.bind(inst));

		return inst;
	}
} 


export default ArticlesList;