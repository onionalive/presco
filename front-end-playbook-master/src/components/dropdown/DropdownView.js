import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Dropdown extends Component {
	render() {
		return (
			<span className="dropdown">
				<span className="container">
					<label className="label" htmlFor="first">{this.props.label}</label>
				</span>
				<span className="container">
					{this.props.children}
					<span className="icon"></span>
				</span>
			</span>
		);
	}
}

Dropdown.propTypes = {
	example: PropTypes.string
}

export default Dropdown;
