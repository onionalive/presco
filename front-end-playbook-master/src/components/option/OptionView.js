import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Option extends Component {
	render() {
		return (
			<span className="option">
				<input className={this.props.type} type={this.props.type} id={this.props.idName} name={this.props.name} value={this.props.value} />
				<span className="toggle"></span>
				<label className="label" htmlFor={this.props.idName}>{this.props.label}</label>
			</span>
		);
	}
}

Option.propTypes = {
	example: PropTypes.string
}

export default Option;
