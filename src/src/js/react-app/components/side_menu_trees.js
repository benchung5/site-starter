import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideMenuHeader from './side_menu_header';
import ButtonsCategoriesTrees from './buttons_categories_trees';
import ButtonsOrigins from './buttons_origins';
// import Routes from './buttons_routes';
// import NearMe from './button_near_me';
// import OffLineMessage from './offline_message';
import { searchTrees } from '../actions/globalTrees';
import Socials from './parts/socials';
import Transition from 'react-transition-group/Transition';
import prefix from 'react-prefixer';

//for transition
const duration = 600;
const defaultStyle = prefix({
          transition: `transform ${duration}ms ease-in-out`,
          transform: `translateX(-100%)`,
        });
const transitionStyles = prefix({
          entering: { transform: 'translateX(0)' },
          entered:  { transform: 'translateX(0)' },
          // exiting: { transform: 'translateX(-100%)' },
          // exited: { transform: 'translateX(-100%)' },
        });

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps) {
    //fire the updated globalFilterData to the search action whenever the themes or categores get updated
    if(this.props.globalFilterData && (prevProps.globalFilterData !==  this.props.globalFilterData)) {
      //while filter initial populating, don't dispatch
      if((this.props.globalFilterData.categoriesTrees.length === 0) || (this.props.globalFilterData.origins.length === 0)) {
      } else {
        this.props.dispatch(searchTrees(this.props.globalFilterData));
      }  
    }
  }

  // isEmpty(obj) {
  //     for(var key in obj) {
  //         if(obj.hasOwnProperty(key))
  //             return false;
  //     }
  //     return true;
  // }

  // <NearMe className="right near-me"/>
  // <OffLineMessage/>

  render() {
    return (
      <Transition in={(this.props.showMenu == 'open') ? true : false} timeout={duration}>
        {(state) => (
          <div className={`side-menu ${this.props.showMenu}`} style={{...defaultStyle, ...transitionStyles[state]}}>
            <SideMenuHeader/>
            <ButtonsCategoriesTrees/>
            <ButtonsOrigins/>
            <div className="bottom">
            </div>
          </div>
        )}
      </Transition>
    );
  }
}

//<Routes/>

function mapStateToProps(state) {
  return {
    globalFilterData: state.globalTrees,
    showMenu: state.showMenu.showMenu
  }
}

export default connect(mapStateToProps)(SideMenu);