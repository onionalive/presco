import React, { Component } from 'react';
import Master from 'components/master/Master';

export default class TileDetailView extends Component {

	renderOfferDetails() {
		return (
			<div className="offer-details-container">
				<div className="row">
					<div className="offer-dates">
						<h4>Offer available</h4>
						<div className="border-bottom"></div>
						<div className="date-container">
							<div className="date-from">
								<p className="bold">From</p>
								<p>27th August, 2017</p>
							</div>
							<div className="date-until">
								<p className="bold">Until</p>
								<p>10th June, 2018</p>
							</div>
						</div>
					</div>
					<div className="offer-steps">
						<h4>Steps to redeem</h4>
						<div className="border-bottom"></div>
						<div className="step-container">
							<div className="step-number">
								<div className="circle">
									<p>1</p>
								</div>
							</div>
							<div className="step-detail">
								<p>Sit amet, consectetur adipis picing elit set delor ipsum delor ipsum set.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<Master>
				<div className="tile-details">
					<div className="third-nav">
						<div className="secondary-container">
							<span><a href="/">&lt; Back</a></span>
							<h1>{this.props.location.pathname === '/offers-test' ? 'Offer' : 'Promo' } Title</h1>
						</div>
					</div>
					<div className="secondary-container">
						<div className="image-container">
							<img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" />
						</div>
						<div className="description-container">
							<p>Lorem ipsum dolor sit amet, sed laudem quaestio delicatissimi ne. Ut qui suavitate laboramus, cu vel purto minim hendrerit, prodesset pertinacia contentiones an vim. Elitr equidem ea quo, sed no partem nusquam salutandi. Sumo facer utinam eu qui, no cum civibus argumentum.</p>
						</div>
						{ this.props.location.pathname === '/offers-test' && this.renderOfferDetails() }
						<div className="terms-container">
							<span>Terms and Conditions</span>
							<p>Lorem ipsum dolor sit amet, sed laudem quaestio delicatissimi ne.</p>
						</div>
					</div>
				</div>
			</Master>
		);
	}
}
