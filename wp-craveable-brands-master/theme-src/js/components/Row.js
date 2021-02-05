import React, { Component } from 'react';

export default class Row extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (Object.keys(this.props.row).length !== 0) {
			return (
				<section className="row">
					<div className="inner">
						<div className="row">
							<div className="quote-div -half">
								<div className="quote-text" dangerouslySetInnerHTML={{__html: this.props.row.title}}></div>
							</div>
							<div className="intro-content -half">
								<p dangerouslySetInnerHTML={{__html: this.props.row.paragraph}}></p>
							</div>
						</div>
					</div>
				</section>
			)
		} else {
			return (null)
		}
	}
}
