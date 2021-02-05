import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Grid extends Component {
	render() {
		return (
			<div className="grid">
				{this.props.children}
			</div>
		);
	}
}

Grid.propTypes = {
	example: PropTypes.string
}

export default Grid;
