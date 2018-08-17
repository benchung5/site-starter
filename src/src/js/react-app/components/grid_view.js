import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showSingle } from '../actions/showSingle';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, UPLOADS_PATH } = require('../config')[env];

import { imgName } from '../lib/stringUtils';


class GridView extends Component {

    onItemClick(slug) {
        //e.preventDefault();
        this.props.dispatch(showSingle(slug));
    }
    
    renderItems() {
         return this.props.results.articles.map((item) => {
             return (

                <a href={`#${item.slug}`} className="product-card" alt={item.name} key={item.id} onClick={this.onItemClick.bind(this, item.slug)} data-slug={item.slug}>
                    <div className="inner">
                        <div className="image">
                            <div className="img-info"></div>
                            <picture>
                                <source srcset={ROOT_URL + UPLOADS_PATH + imgName(item.images.split(',')[0], 'small')} media="(max-width: 1275px)"/>
                                <source srcset={ROOT_URL + UPLOADS_PATH + item.images.split(',')[0]}/>
                                <img src={ROOT_URL + UPLOADS_PATH + item.images.split(',')[0]}/> 
                            </picture>
                        </div>
                        <div className="info">
                            <div className="info-detail">some info...</div>
                        </div>
                    </div>
                </a>
             );
         });   
    }

    // <div className="product-card boxed" key={item.id}>
    //     <a href={`#${item.slug}`} alt={item.name} className={`left active installation`} onClick={this.onItemClick.bind(this, item.slug)} data-slug={item.slug}>
    //         <div className="icon"></div>
    //         { item.images ?
    //         <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL + UPLOADS_PATH + imgName(item.images.split(',')[0], 'small')})` }} ></div>
    //         :
    //         <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL}/assets/img/placeholder-images/placeholder-img-sml.jpg)` }} ></div>
    //         }
    //     </a>
    // </div>
    
    render() {
        return (
            <div className="cards-container-wrapper">
                <div className="cards-container">
                  {this.renderItems()}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        results: state.articles.searchResults,
    };
}

export default connect(mapStateToProps)(GridView);