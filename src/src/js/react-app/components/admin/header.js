import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';



class Header extends Component {

    onSignOutClick() {
        this.props.signoutUser();
    }

    renderLinks() {
      if (this.props.authenticated) {
          // show a link to sign out
          return (
            <li className="">
              <a href="#" className="" onClick={this.onSignOutClick.bind(this)}>Sign Out</a>
            </li>
            );
        } else {
            // show a link to sign
            return (
              <li className="">
                
              </li>
              );
        }
      }

    render() {
        return (
            <div>
                <nav className="">
                    <ul className="vertical menu header-nav">
                        <li className="nav-item">
                        <a href="/explore" className="nav-link">Website</a>
                        </li>
                        {this.renderLinks() }
                    </ul>
                </nav>
            </div>
            );
    }
}

function mapStateToProps(state) {
  return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(Header);
