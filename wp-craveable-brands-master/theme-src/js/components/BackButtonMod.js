import React from 'react';
import { BaseUrl } from './../libs/baseUrl';

export default class BackButtonMod extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const baseUrl = BaseUrl();

		return (
			<div className="back-button">
				<div className="inner">
					<a href={ this.props.backURL }><span className="fa fa-chevron-left" aria-hidden="true"></span> Back to { this.props.page }</a>
				</div>
			</div>
		);
	}
}
