import React from 'react';

export default class Footer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const pathName = window.location.pathname;
		const careersPage = (pathName.indexOf('/careers') > -1);

		return (
			<footer id="contact-us">
				<div className="inner">
					<div className="details">
						<h2>Our offices.</h2>
						<p>craveable brands. welcomes your comments and feedback. You may contact us via email and your query will be redirected to the most appropriate department.</p>
						<h3>Contact us</h3>
						<div className="address">
							<span className="state">Head Office – New South Wales</span>
							<span className="line-1">Level 12, 12 Help Street</span>
							<span className="line-2">Chatswood, NSW 2067</span>
							<span className="line-3">for general enquiries: <a href='mailto:reception@craveablebrands.com'>reception@craveablebrands.com</a></span>
							<span className="line-4">for media enquiries: <a href='mailto:media@craveablebrands.com'>media@craveablebrands.com</a></span>
							<span className="line-4">Looking for a career? <a href='mailto:careers@craveablebrands.com'>careers@craveablebrands.com</a></span>
						</div>
					</div>
					<hr />
					<div className="address-container">
						<div className="address">
							<span className="state">Western Australia</span>
							<span className="line-1">Level 2, 71 Walters Drive</span>
							<span className="line-2">Osborne Park WA 6017</span>
						</div>
						<div className="address">
							<span className="state">Queensland</span>
							<span className="line-1">Portal East, Level 1, Unit 12</span>
							<span className="line-2">2994 Logan Road</span>
							<span className="line-3">Springwood 4127</span>
						</div>
						<div className="address">
							<span className="state">Victoria</span>
							<span className="line-1">Level 1, Unit 17</span>
							<span className="line-2">202 Ferntree Gully Road</span>
							<span className="line-3">Notting Hill 3168</span>
						</div>
						<div className="address">
							<span className="state">Philippines</span>
							<span className="line-1">Building 4</span>
							<span className="line-2">SM City Clark Angeles City</span>
							<span className="line-3">Philippines 2009</span>
						</div>
						<div className="address">
							<span className="state">Singapore</span>
							<span className="line-1">Level 42</span>
							<span className="line-2">6 Battery Road</span>
							<span className="line-3">Singapore</span>
						</div>
					</div>
					<div className="map-container">
						<div className="map-img"></div>
						<div className="office-locations">
							<div className="dot -nsw"></div>
							<div className="dot -wa"></div>
							<div className="dot -qld"></div>
							<div className="dot -vic"></div>
							<div className="dot -sg"></div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
