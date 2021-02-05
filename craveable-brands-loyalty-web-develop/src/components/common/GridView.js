import React, { Component } from 'react';
import Master from 'components/master/Master';
import RowTiles from 'components/common/RowTiles';
import Button from 'components/common/Button';

export default class GridView extends Component {

	render() {
		const type = this.props.location.pathname === "/promotions" ? "promo" : "offer";
		const notch = this.props.location.pathname === "/promotions" ? "false" : "true";

		return (
			<Master>
				<div className="grid-view">
					<div className="third-nav">
						<div className="secondary-container">
							<span><a href="/">&lt; Back to Home</a></span>
							<h1>{this.props.location.pathname === '/promotions' ? "What's New" : "My Offers" }</h1>
						</div>
					</div>
					<div className="secondary-container">
					{ this.props.location.pathname === '/offers' &&
						<div className="tab-row">
							<a href="/offers/active" className="tab">
								<h3 className="active">Active</h3>
								<div className="active-border-bottom"></div>
							</a>
							<a href="/offers/used" className="tab">
								<h3>Used</h3>
							</a>
							<a href="/offers/expired" className="tab">
								<h3>Expired</h3>
							</a>
						</div>
					}
						<RowTiles
							type={type}
							notch={notch}
						/>
						<Button 
							buttonText="Load More"
						/>
					</div>
				</div>
			</Master>
		);
	}
}