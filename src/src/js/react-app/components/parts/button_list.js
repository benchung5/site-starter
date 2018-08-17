import React, { Component } from 'react';
import ButtonComponent from './button_component';

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
	    	let isActive = (item.id === id) ? !item.active : item.active;
	    	return { id: item.id, name: item.name, active: isActive };
	    });

	    this.props.updateData(modifiedData);
	}

	renderButtons() {
		return this.props.buttonData.map((item, index) => {
			//name to lowercase, replace slashes with dashes
			return (
					<div className={this.props.wrapperClass} key={item.id}>
				        <ButtonComponent 
				    	    classProp={`${this.props.classPropButton} ${item.name.toLowerCase().replace(/\//g, '-')}`}
				    	    isActive={item.active} 
				    	    id={item.id} 
				    	    name={item.name} 
				    	    onClickProp={this.onItemClick.bind(this)}
				        >	
				        	<div className='check' onClick={this.onItemClick.bind(this)}></div>
				    	    <div className="icon" onClick={this.onItemClick.bind(this)} data-id={item.id}></div>
				    	    <span onClick={this.onItemClick.bind(this)} data-id={item.id} className="name">{item.name}</span>
				        </ButtonComponent>						
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

export default ButtonList;