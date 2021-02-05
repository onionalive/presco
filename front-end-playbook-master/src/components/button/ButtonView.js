import React, { Component } from 'react';
/* user imports */

class Button extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		console.log(this.props);
		return (
			<button className={`button
				${this.props.type ? this.props.type : ''}
				${this.props.size ? this.props.size : ''}
				${this.props.hover ? this.props.hover : ''}`}
				onClick={() => this.props.action()}
				>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
