import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ProtectedWarning extends Component {
	render() {
		return (
			<div className="admin-main">
		        <div className="row">
		                <div className="columns small-12">
		                	<p>Please sign up or <Link className="" to="/signin">login</Link>.</p>
		                </div>
		        </div>
		    </div>
		);
	}
}

export default ProtectedWarning;