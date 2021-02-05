import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */

class TextInputDocumentation extends Component {
	render() {
		return (
			<div>
				<h1>Ready to roll!</h1>
				<h2>Time to write some Redux</h2>
			</div>
		);
	}
}

TextInputDocumentation.propTypes = {
	example: PropTypes.string
}

export default TextInputDocumentation;
