import React, { Component } from 'react';

class EditBox extends Component {

constructor(props) {
   super(props)
   this.state = {
    fieldValue: ''
  }
}

componentDidUpdate(prevProps, prevState) {
  if(prevProps.input.value !== this.props.input.value) {
    this.setState({fieldValue: this.props.input.value});
  }
}

onTextAreaChange(inputValue) {
  this.setState({fieldValue: inputValue});
}

onSecHeadingClick(e) {
 e.stopPropagation();
 e.preventDefault();

 this.wrapTextInElement('h3');
}

onParagraphClick(e) {
  e.stopPropagation();
  e.preventDefault();

  this.wrapTextInElement('p');
}

wrapTextInElement(element) {
  if (this.state.fieldValue) {
     //get the current highlighted text
     let selObj = window.getSelection(); 
     let selectedText = selObj.toString();
     let wrappedText = '<'+element+'>'+selectedText+'</'+element+'>';

     //get the character index of the selected text
     this.refs.textBox.selectionStart

     String.prototype.replaceAt=function(index, replacement) {
       return this.substr(0, index) + replacement + this.substr(index + selectedText.length);
     }

     let replacedBodyText = this.state.fieldValue.replaceAt(this.refs.textBox.selectionStart, wrappedText);
     this.setState({fieldValue: replacedBodyText});
    }
  }

  render() {
   return (
     <div className={this.props.className}>
     <label>{this.props.input.label}</label>
     <button onClick={this.onSecHeadingClick.bind(this)}>h3</button>
     <button onClick={this.onParagraphClick.bind(this)}>p</button>
     <textarea
     ref="textBox"
     className="form-control"
     rows="12" 
     cols="50"
     name={this.props.input.name}
     value={this.state.fieldValue}
     onChange={(e) => this.onTextAreaChange(e.target.value)}
     >
     </textarea>
     </div>
     );
 }

}

export default EditBox;