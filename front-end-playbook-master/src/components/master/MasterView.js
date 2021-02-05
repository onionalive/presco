import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Header from '../header/Header';
// import Footer from '../footer/Footer';

/* user imports */

class Master extends Component {
	render() {
		return (
			<div className="master">
				{ this.props.children }
			</div>
		);
	}
}

Master.propTypes = {
	example: PropTypes.string
}

export default Master;
