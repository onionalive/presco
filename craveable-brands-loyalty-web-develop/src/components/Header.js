import React from 'react';
import { Link } from 'react-router';
import Images from '../img/Image';

export default class Header extends React.Component {

	renderBadge(loyaltyStatus) {
		let badge;
		switch(loyaltyStatus) {
			case 'Orange':
				return badge = Images.Oporto.iconOrange;
			case 'Silver':
				return badge = Images.Oporto.iconSilver;
			case 'Gold':
				return badge = Images.Oporto.iconGold;
			case 'Platinum':
				return badge = Images.Oporto.iconPlatinum;
			default:
				return;
		}
	}

	render() {
		const loyaltyStatus = 'Silver';
		let badge;

		return(
			<nav id="header" className="header">
				<div className="secondary-nav">
					<div className="secondary-nav-container">
						<ul className="secondary-header-links-container">
							<li className="greeting">
								Hi {this.props.name}
							</li>
							<li className="item">
								<span className="nav-fieldname">Dollars</span>
								<span className="nav-fieldvalue">${this.props.loyaltyBalance}</span>
								<span className="nav-fieldlink"><Link to="/transactions">View ></Link></span>
							</li>
							<li className="item">
								<span className="nav-fieldname">Status</span>
								<span className="nav-fieldvalue status-badge"><img src={this.renderBadge(loyaltyStatus)} alt="" /> Silver</span>
								<span className="nav-fieldlink"><Link to="#placeholder">View ></Link></span>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}