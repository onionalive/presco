import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* user imports */
import Button from '../button/Button';

class Modal extends Component {
	render() {
		return (
			<div className="modal">
				<div className="content">
					<span className="close">
						<p>Close</p>
						<button className="icon" />
					</span>
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	example: PropTypes.string
}

export default Modal;
