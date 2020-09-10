import Component from '../component';
import Router from '../router';
import SignIn from './auth/signIn';
import Dashboard from './dashboard';
import ProtectedWarning from './auth/protectedWarning';
import SignedOut from './auth/signedOut';
import PageNotFound from './404';
import PlantsList from './plants/plantsList';
import PlantAdd from './plants/plantAdd';
import PlantEdit from './plants/plantEdit';
import ArticleList from './articles/articleList';
import ArticleAdd from './articles/articleAdd';
import ArticleEdit from './articles/articleEdit';
import Auth from './auth/auth';
import plantListStore from '../storage/plantListStore';
import plantFilterStore from '../storage/plantFilterStore';
import plantTablesStore from '../storage/plantTablesStore';
import articleListStore from '../storage/articleListStore';
import articleFilterStore from '../storage/articleFilterStore';
import articleTablesStore from '../storage/articleTablesStore';
import appStateStore from '../storage/appStateStore';
import SignInPopup from './auth/signInPopup';

(function() {
	var Main = {
		update: function(route) {
			//clear el first
			this.el.innerHTML = '';
			if(route === 'signin') {
				this.el.appendChild(this.signIn.el);
			} else if((route === 'dashboard') || (route === '')) {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.dashboard.el.querySelector('#user').innerHTML = authData.email;
						this.el.appendChild(this.dashboard.el);
					} else {
						this.signInPopup.open(() => {
							this.dashboard.el.querySelector('#user').innerHTML = authData.email;
							this.el.appendChild(this.dashboard.el);
						});
					}
				});
			} else if(route === 'signed-out') {
				Auth.signOutUser();
				this.el.appendChild(this.signedOut.el);
			} else if(route === 'plants-list') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.el.appendChild(this.plantsList.el);
					} else {
						this.signInPopup.open(() => {
							this.el.appendChild(this.plantsList.el);
						});
					}
				});
			} else if(route === 'plant-add') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.el.appendChild(this.plantAdd.el);
					} else {
						this.signInPopup.open(() => {
							this.el.appendChild(this.plantAdd.el);
						});
					}
				});
			} else if(route === 'plant-edit') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.plantEdit.onLoad();
						this.el.appendChild(this.plantEdit.el);
					} else {
						this.signInPopup.open(() => {
							this.plantEdit.onLoad();
							this.el.appendChild(this.plantEdit.el);
						});
					}
				});
			} else if(route === 'article-list') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.el.appendChild(this.articleList.el);
					} else {
						this.signInPopup.open(() => {
							this.el.appendChild(this.articleList.el);
						});
					}
				});
			} else if(route === 'article-add') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.el.appendChild(this.articleAdd.el);
					} else {
						this.signInPopup.open(() => {
							this.el.appendChild(this.articleAdd.el);
						});
					}
				});
			} else if(route === 'article-edit') {
				Auth.authenticate((authData) => {
					if(authData.id) {
						this.articleEdit.onLoad();
						this.el.appendChild(this.articleEdit.el);
					} else {
						this.signInPopup.open(() => {
							this.articleEdit.onLoad();
							this.el.appendChild(this.articleEdit.el);
						});
					}
				});
			} else {
				this.el.appendChild(this.pageNotFound.el);
			}
			this.render()
		},
		init: function() {
			var proto = Object.assign({}, this, Component)
			var inst = Object.create(proto);
			proto.constructor = inst;

			//call initialize on Component first
			inst.initialize({
				container: document.querySelector('.js-app-container'),
			});
			
			//init storage items
			plantListStore.init();
			plantFilterStore.init();
			plantTablesStore.init();
			appStateStore.init();
			articleListStore.init();
			articleFilterStore.init();
			articleTablesStore.init();

			//components to show
			inst.signIn = SignIn.init();
			inst.pageNotFound = PageNotFound.init();
			inst.signedOut = SignedOut.init();
			inst.dashboard = Dashboard.init();
			inst.plantsList = PlantsList.init();
			inst.plantAdd = PlantAdd.init();
			inst.plantEdit = PlantEdit.init();
			inst.articleList = ArticleList.init();
			inst.articleAdd = ArticleAdd.init();
			inst.articleEdit = ArticleEdit.init();
			inst.signInPopup = SignInPopup.init();

			

			Router.init(inst.update.bind(inst));

			return inst;
		}
	}

	Main.init();
})();

