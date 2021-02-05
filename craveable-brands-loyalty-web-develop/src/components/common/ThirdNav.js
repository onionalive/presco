import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class ThirdNav extends Component {
	render() {
		const { title } = this.props;

		return (
			<div className="third-nav">
				<div className="secondary-container">
					<span onClick={browserHistory.goBack}>&lt; Back</span>
					<h1>{ title }</h1>
				</div>
			</div>
		);
	}
}