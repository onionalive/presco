import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Breadcrumbs extends Component {
	render() {
		return (
			<div className="breadcrumbs">{this.props.children}</div>
		);
	}
}

Breadcrumbs.propTypes = {
	example: PropTypes.string
}

export default Breadcrumbs;
