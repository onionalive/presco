import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Breadcrumb extends Component {
	renderLink() {
		if (this.props.url) {
			return (
				<a href={this.props.url} className="item">{this.props.label}</a>
			);
		} else {
			return (
				<span className="item">{this.props.label}</span>
			);
		}
	}
	render() {
		return (
			<span className="breadcrumb">
				{ this.renderLink() }
			</span>
		);
	}
}

Breadcrumb.propTypes = {
	example: PropTypes.string
}

export default Breadcrumb;
