import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('../../helpers/prism');

/* user imports */
class Documentation extends Component {
	componentDidUpdate() {
		console.log('hurr');
	}

	render() {
		const title = this.props.type ? this.props.type.replace('-', ' ') : '';

		return (
			<div className={`documentation ${this.props.type}`}>
				{ this.props.type !== 'notes' &&
					<div className='heading'>
						<h2>{title}</h2>
					</div>
				}
				{this.props.children}
			</div>
		);
	}
}

export default Documentation;
