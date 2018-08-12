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
import OffLineModal from './offline_modal';
import { isOnline } from '../actions/isOnline';
import { showMenu } from '../actions/sideMenu';
import { isInitialLoading } from '../actions/initialLoad';
// import OfflineMap from './offline_map';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    console.log('loading');
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
  }

  componentDidMount() {
    this.props.isInitialLoading(false);
  }

  onMapClick() {
    //close the menu on map click
    if(window.innerWidth < 1150 ) {
      if(this.props.menuOpen === 'open') {
        this.props.showMenu('close');
      }
    }
  }

  // <MapComponent
  //   onMapClick={this.onMapClick.bind(this)}
  // />

  // <SearchButton/>

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
    isOnline: isOnline,
    showMenu: showMenu,
    isInitialLoading: isInitialLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
