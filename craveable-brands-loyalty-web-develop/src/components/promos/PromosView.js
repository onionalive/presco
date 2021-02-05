import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';
import SingleTilePromo from 'components/common/SingleTilePromo';
import Button from 'components/common/Button';

export default class Promos extends Component {

	constructor(props) {
		super(props);
		this.once = false;
	}

	promosList() {
		const items = this.props.promotions;
		try {
			if (items.length > 1) {
				const listItems = items.map((item, index) =>
					<SingleTilePromo
						title={item.title}
						key={item.title}
						image={item.image}
						terms={item.terms_copy}
						description={item.body}
						router={this.props.router}
					/>
				);
				return <div>{listItems}</div>
			} else if (items.length === 1) {
				return (
					<SingleTilePromo
						title={items[0].title}
						key={items[0].title}
						image={items[0].image}
						terms={items[0].terms_copy}
						description={items[0].body}
						router={this.props.router}
					/>
				);
			} else if (items.length === 0) {
				return (
					<div className="error-container">
						<h3>No promotions available</h3>
						<p>Check back again soon</p>
					</div>
				);
			} else {
				return (
					<div className="error-container">
						<h3>Promotions failed to load</h3>
						<p>We will retry in 40 seconds...</p>
						<Link to="#placeholder">Retry</Link>
					</div>
				);
			}
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const type = this.props.location.pathname === "/promotions" ? "promo" : "offer";
		const notch = this.props.location.pathname === "/promotions" ? "false" : "true";

		return (
			<Master>
				<div className="grid-view promos">
					<ThirdNav
						title="What's New"
					/>
					<div className="secondary-container">
						<div className="promos-list">
							{ this.promosList() }
						</div>
						<Button 
							buttonText="Load More"
						/>
					</div>
				</div>
			</Master>
		);
	}
}