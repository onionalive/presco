import React from 'react';

export default class IntroMod extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className="intro-mod">
				<div className="inner">
					<div className="row">
						<div className="quote-div -half">
							<div className="quote-container">
								<h2 className="quote-text">{ this.props.heading_quote }</h2>
								<p className="quote-cite" dangerouslySetInnerHTML={{__html: this.props.cite}}></p>
							</div>
						</div>
						<div className="intro-content -half" dangerouslySetInnerHTML={{__html: this.props.copy}}></div>
					</div>
				</div>
			</section>
		);
	}
}
