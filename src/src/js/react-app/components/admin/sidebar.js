import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './header';
import cloneDeep from 'lodash/cloneDeep';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkList: [
                { title: 'Dashboard', link: '/admin', active: false },
                { title: 'View Articles', link: '/admin/articles-list', active: false },
                { title: 'Add Articles', link: '/admin/article-add', active: false },
                { title: 'View Trees', link: '/admin/trees-list', active: false },
                { title: 'Add Trees', link: '/admin/tree-add', active: false },
                { title: 'View Users', link: '/admin/users-list', active: false },
                { title: 'Add User', link: '/admin/signup', active: false },
                { title: 'View Categories', link: '/admin/category-list', active: false },
                { title: 'Add Category', link: '/admin/category-add', active: false },
                { title: 'Add Theme', link: '/admin/theme-add', active: false },
                { title: 'View Themes', link: '/admin/theme-list', active: false },
                { title: 'Backup', link: '/admin/backup', active: false },
            ]
        }
    }


    componentDidMount() {
        //check url and highlight accordingly
        let linkListClone = cloneDeep(this.state.linkList);
        linkListClone.forEach((item, index) => {

            //set all to inactive at first
            if (item.active) {
                item.active = false;
            }
            //if url path equals link, activate it
            if (item.link === window.location.pathname) {
                item.active = true;
            }
        });
        this.setState({ linkList: linkListClone });
    }

    onLinkClick(e) {
    }

    renderButtons() {
        return this.state.linkList.map((item, index) => {
            //title to lowercase, replace slashes with dashes
            return (
                    <li key={index} className={`${item.active ? 'active' : ''}`}>
                        <Link onClick={this.onLinkClick.bind(this)}  className={`nav-link`} to={item.link} data-id={index}>{item.title}</Link>
                    </li>
                )
        });
    }

    render() {
        return (
            <div className="columns small-12 large-3">
                <ul className="vertical menu admin-side-menu">
                    <li>
                        <Header/>
                    </li>
                    {this.renderButtons()}
                </ul>
            </div>
        )
    }

}

export default SideMenu;