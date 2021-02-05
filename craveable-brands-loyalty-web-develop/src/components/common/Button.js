import React, { Component } from 'react';

export default class Button extends Component {

	render() {
		return (
			<a onClick={this.props.onClick ? this.props.onClick : null} href={this.props.href ? this.props.href : '#'} className={this.props.buttonClass ? this.props.buttonClass : 'button'}>{this.props.buttonText ? this.props.buttonText : 'PLACEHOLDER' }</a>
		);
	}
}
