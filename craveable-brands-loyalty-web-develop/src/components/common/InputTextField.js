import React, { Component } from 'react';
import Button from 'components/common/Button';

export default class InputTextField extends Component {

	render() {
		console.log("here");
		const { title, body, placeholder, inputType, inputName, buttonText } = this.props;
		return (
			<input 
				type={inputType} 
				name={inputName} 
				placeholder={placeholder}
			/>
		);
	}
}