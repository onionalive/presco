import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Block extends Component {
	render() {
		return (
			<div className={this.props.animation}></div>
		);
	}
}

Block.propTypes = {
	example: PropTypes.string
}

export default Block;
