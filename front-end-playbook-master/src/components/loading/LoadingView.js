import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class Loading extends Component {
	render() {
		return (
			<div className="loading-overlay">
				<div data-loading className="loading">
					<svg className="loading-svg" viewBox="-75 -75 150 150">
						<circle cx="0" cy="0" r="37.5" />
					</svg>
				</div>
			</div>
		);
	}
}

Loading.propTypes = {
	example: PropTypes.string
}

export default Loading;
