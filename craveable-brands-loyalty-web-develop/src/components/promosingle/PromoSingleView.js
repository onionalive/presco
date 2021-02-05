import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';

export default class PromoSingle extends Component {

	render() {
		const { title, terms, description, image } = this.props.selectedItem;

		return (
			<Master>
				<div className="tile-details">
					<ThirdNav 
						title={title}
					/>
					<div className="secondary-container">
						<div className="image-container">
							{ image ? <img src={image} alt="" /> : <img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" /> }
						</div>
						<div className="description-container">
							<p>{ description ? description : title }</p>
						</div>
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
