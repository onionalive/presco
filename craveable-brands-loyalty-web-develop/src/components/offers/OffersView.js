import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';
import SingleTileOffer from 'components/common/SingleTileOffer';
import Button from 'components/common/Button';

export default class Offers extends Component {

	constructor(props) {
		super(props);
		this.once = false;
	}

	componentDidUpdate(data) {
		console.log('wae', this.props.profile);
		if (
			this.props.profile.token &&
			this.props.profile.id &&
			this.props.activeOffers === false
		) {
			const id = this.props.profile.id;
			const token = this.props.profile.token;
			this.props.getOffersActive(id, token);
		}

		if (
			this.props.profile.token &&
			this.props.profile.id &&
			this.props.expiredOffers === false
		) {
			const id = this.props.profile.id;
			const token = this.props.profile.token;
			this.props.getOffersExpired(id, token);
		}
	}

	offersActiveList() {
		const items = this.props.activeOffers;
		try {
			if (items.length > 1) {
				const listItems = items.map((item) =>
					<SingleTileOffer
						title={item.voucherDescription}
						id={item.id}
						dateStart={item.startDate}
						dateEnd={item.endDate}
						type="active"
						router={this.props.router}
						notch
					/>
				);
				return <div>{listItems}</div>
			} else if (items.length === 1) {
				return (
					<SingleTileOffer
						title={items[0].voucherDescription}
						id={items[0].id}
						dateStart={items[0].startDate}
						dateEnd={items[0].endDate}
						type="active"
						router={this.props.router}
						notch
					/>
				);
			} else if (items.length === 0) {
				return (
					<div className="error-container">
						<h3>No offers available</h3>
						<p>Check back again soon</p>
					</div>
				);
			} else {
				return (
					<div className="error-container">
						<h3>Offers failed to load</h3>
						<p>We will retry in 40 seconds...</p>
						<Link to="#placeholder">Retry</Link>
					</div>
				);
			}
		} catch(err) {
			console.log(err);
		}
	}

	offersExpiredList() {
		const items = this.props.expiredOffers;
		try {
			if (items.length > 1) {
				const listItems = items.map((item) =>
					<SingleTileOffer
						title={item.voucherDescription}
						id={item.id}
						dateStart={item.startDate}
						dateEnd={item.endDate}
						type="expired"
						router={this.props.router}
						notch
					/>
				);
				return <div>{listItems}</div>
			} else if (items.length === 1) {
				return (
					<SingleTileOffer
						title={items[0].voucherDescription}
						id={items[0].id}
						dateStart={items[0].startDate}
						dateEnd={items[0].endDate}
						type="expired"
						router={this.props.router}
						notch
					/>
				);
			} else if (items.length === 0) {
				return (
					<div className="error-container">
						<h3>No offers available</h3>
						<p>Check back again soon</p>
					</div>
				);
			} else {
				return (
					<div className="error-container">
						<h3>Offers failed to load</h3>
						<p>We will retry in 40 seconds...</p>
						<Link to="#placeholder">Retry</Link>
					</div>
				);
			}
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		let offersList;
		let expired;
		if (this.props.location.pathname === "/offers" && this.props.location.hash === '#expired') {
			offersList = this.offersExpiredList();
			expired = true;
		} else if (this.props.location.pathname === "/offers") {
			offersList = this.offersActiveList();
			expired = false;
		}

		return (
			<Master>
				<div className="grid-view offers">
					<ThirdNav
						title="My Offers"
					/>
					<div className="secondary-container">
						<div className="tab-row">
							<a href="/offers#active" className="tab">
								<h3 className={!expired && "active"}>Active</h3>
								{!expired && <div className="active-border-bottom"></div> }
							</a>
							<a href="/offers#expired" className="tab">
								<h3 className={expired && "active"}>Expired</h3>
								{expired && <div className="active-border-bottom"></div> }
							</a>
						</div>
						<div className="offers-list">
							{ offersList }
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