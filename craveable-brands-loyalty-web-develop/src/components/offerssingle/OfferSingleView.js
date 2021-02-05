import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';

export default class OfferSingle extends Component {

	renderOfferDetails() {
		const { dateEnd, dateStart, redeemSteps } = this.props.selectedItem;

		return (
			<div className="offer-details-container">
				<div className="row">
					<div className="offer-dates">
						<h4>Offer available</h4>
						<div className="border-bottom"></div>
						<div className="date-container">
							<div className="date-from">
								<p className="bold">From</p>
								<p>{dateStart}</p>
							</div>
							<div className="date-until">
								<p className="bold">Until</p>
								<p>{dateEnd}</p>
							</div>
						</div>
					</div>
					{ redeemSteps &&
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
					}
				</div>
			</div>
		);
	}

	render() {
		const { title, terms, description, image, type } = this.props.selectedItem;
		const expired = type === expired ? true : false;

		return (
			<Master>
				<div className="tile-details">
					<ThirdNav
						title={expired ? "Expired: " + title : title}
					/>
					<div className="secondary-container">
						<div className="image-container">
							{ image ? <img src={image} alt="" /> : <img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" /> }
						</div>
						<div className="description-container">
							<p>{ description ? description : title }</p>
						</div>
						{ this.renderOfferDetails() }
						{ terms && 
							<div className="terms-container">
								<span>Terms and Conditions</span>
								<p>{ terms }</p>
							</div>
						}
					</div>
				</div>
			</Master>
		);
	}
}
