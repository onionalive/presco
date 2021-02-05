import React, { Component } from 'react';
import Button from 'components/common/Button';

export default class CommonInfoBox extends Component {

	render() {
		const { title, body, placeholder, inputType, inputName, buttonText, inputTwo, inputTypeTwo, inputNameTwo, placeholderTwo } = this.props;
		return (
			<form className="common-info-box">
				<h3>{ title }</h3>
				{ body ? 
					<div className="body-text">
						<p>{body}</p>
					</div>
					: null
				}
				{this.props.children}
				<Button 
					buttonText={buttonText}
					onClick={this.props.handleClick}
				/>
			</form>
		);
	}
}