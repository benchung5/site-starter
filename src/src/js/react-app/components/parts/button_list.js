import React, { Component } from 'react';
import ButtonComponent from './button_component';
import { connect } from 'react-redux';

class ButtonList extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	onItemClick(event) {
		event.preventDefault();
		let id = event.target.getAttribute('data-id');

	    let modifiedData = this.props.buttonData.map((item, index) => {
	    	//set current active to the opposite of what it was (toggle);
	    	let isActive = (item._id === id) ? !item.active : item.active;
	    	return { _id: item._id, title: item.title, active: isActive };
	    });

	    this.props.updateData(modifiedData);
	}

	renderButtons() {
		return this.props.buttonData.map((item, index) => {
			//title to lowercase, replace slashes with dashes
			return (
					<div className={this.props.wrapperClass} key={item._id}>
					{(this.props.lang === 'fr') ?
					    <ButtonComponent 
						    classProp={`${this.props.classPropButton} ${item.title.toLowerCase().replace(/\//g, '-')}`}
						    isActive={item.active} 
						    id={item._id} 
						    name={item.fr_title} 
						    onClickProp={this.onItemClick.bind(this)}
					    >	
					    	<div className='check' onClick={this.onItemClick.bind(this)}></div>
						    <div className="icon" onClick={this.onItemClick.bind(this)} data-id={item._id}></div>
						    <span onClick={this.onItemClick.bind(this)} data-id={item._id} className="title">{item.fr_title}</span>
					    </ButtonComponent>
					    :
				        <ButtonComponent 
				    	    classProp={`${this.props.classPropButton} ${item.title.toLowerCase().replace(/\//g, '-')}`}
				    	    isActive={item.active} 
				    	    id={item._id} 
				    	    name={item.title} 
				    	    onClickProp={this.onItemClick.bind(this)}
				        >	
				        	<div className='check' onClick={this.onItemClick.bind(this)}></div>
				    	    <div className="icon" onClick={this.onItemClick.bind(this)} data-id={item._id}></div>
				    	    <span onClick={this.onItemClick.bind(this)} data-id={item._id} className="title">{item.title}</span>
				        </ButtonComponent>
					}
						
					</div>

				)
		});
	}

	render() {
		return (
				<div className={`button-list ${this.props.classProp}`}>
					{this.renderButtons()}
				</div>
			)
	}

}

function mapStateToProps(state) {
	return {
		lang: state.language.lang
	}
}

export default connect(mapStateToProps)(ButtonList);