import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Input extends Component {
	render() {
		return (
			<span className="input-set">
				<label className="label" htmlFor={this.props.idName}>{this.props.label}</label>
				<input id={this.props.idName}
						className={this.props.style ? this.props.style : 'input'}
						type="text" name={this.props.name}
						title={this.props.title}
						placeholder={this.props.placeholder} />
			</span>
		);
	}
}

Input.propTypes = {
	example: PropTypes.string
}

export default Input;
