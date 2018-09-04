import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderInternal from './loader_internal';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, UPLOADS_PATH } = require('../config')[env];

import { imgName } from '../lib/stringUtils';


class GridView extends Component {
    // goes above picture element to add magnifine glass
    // <div className="img-info"></div>
    renderItems() {
         return this.props.results.articles.map((item) => {
             return (
                <a href={`view/${item.slug}`} className="product-card" alt={item.name} key={item.id} data-slug={item.slug}>
                    <div className="inner">
                        <div className="image">
                            { item.images ?
                            <picture>
                                <source srcSet={ROOT_URL + UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')} media="(max-width: 1275px)"/>
                                <source srcSet={ROOT_URL + UPLOADS_PATH + item.images.split(',')[0]}/>
                                <img src={ROOT_URL + UPLOADS_PATH + item.images.split(',')[0]}/> 
                            </picture>
                            :
                            <picture>
                                <source srcSet='/assets/img/placeholder-images/placeholder-img-sml.jpg' media="(max-width: 1275px)"/>
                                <source srcSet='/assets/img/placeholder-images/placeholder-img.jpg'/>
                                <img src='/assets/img/placeholder-images/placeholder-img.jpg'/> 
                            </picture>
                            }

                        </div>
                        <div className="info">
                            <div className="info-detail">{item.name}</div>
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
    
    // LoaderInternal is controlled by the action 'isLoading' 
    // (set in global > index.js action)
    render() {
        return (
            <LoaderInternal>
                <div className="cards-container-wrapper">
                    <div className="cards-container">
                      {this.renderItems()}
                    </div>
                </div>
            </LoaderInternal>
        );
    }
}


function mapStateToProps(state) {
    return {
        results: state.articles.searchResults,
    };
}

export default connect(mapStateToProps)(GridView);