import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapComponent from './map_component';
import SideMenu from './sideMenu';
import MapStyleButton from './button_map_style';
import LocationButton from './button_focus_location';
import ShowMenuButton from './button_show_menu';
import ShowListPanelButton from './button_show_list_panel';
import SearchButton from './search_expandable';
import ListPanel from './list_panel';
import ArtPiece from './art_piece';
import Loader from './loader';
import { isOnline } from '../actions/isOnline';
import { changeLanguage } from '../actions/lang';
import OffLineModal from './offline_modal';
import { showMenu } from '../actions/sideMenu';
// import OfflineMap from './offline_map';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    // tell users that they are offline/online
    const that = this;
    window.addEventListener('load', function() {
      function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";

        if(condition == 'offline') {
         $('body').addClass('offline');
         that.props.isOnline(false);
        } else {
         $('body').removeClass('offline');
         that.props.isOnline(true);
        }
      }

      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });

    //check if this is french url path
    let path = window.location.pathname;
    if(path === '/explore-fr') {
      this.props.changeLanguage('fr');
    }
  }

  onMapClick() {
    //close the menu on map click
    if(window.innerWidth < 1150 ) {
      if(this.props.menuOpen === 'open') {
        this.props.showMenu('close');
      }
    }
  }

  render() {
    return (
      <div className={`main-container ${this.props.lang}`}>
        <Loader/>
        <SideMenu/>
        <ListPanel/>
        <ArtPiece />
        <LocationButton/>
        <MapStyleButton/>
        <ShowMenuButton/>
        <ShowListPanelButton/>
        <SearchButton/>
        <MapComponent
          onMapClick={this.onMapClick.bind(this)}
        />
        <OffLineModal/>
      </div>
    );
  }
}

//<OfflineMap/>

function mapStateToProps(state) {
  return {
    // location: state.map.location
    lang: state.language.lang,
    menuOpen: state.showMenu.showMenu,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLanguage: changeLanguage,
    isOnline: isOnline,
    showMenu: showMenu,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
