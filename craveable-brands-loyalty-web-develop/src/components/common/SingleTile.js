import React, { Component } from 'react';

export default class SingleTile extends Component {

	renderNotches() {
		return (
			<div>
				<div className="notch-left"></div>
				<div className="notch-right"></div>
			</div>
		);
	}

	render() {
		const { type, notch } = this.props;

		return (
			<div className="tile">
				<div className={ type === 'offer' ? 'rounded-edges tile-container' : 'tile-container' }>
					<div className={ type === 'offer' ? 'rounded-edges tile-image-container' : 'tile-image-container' }>
						<img src="https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2" alt="" />
					</div>
					<div className="title-overlay">
						<h4>This a title</h4>
						{ type === 'offer' && notch ? this.renderNotches() : null }
					</div>
				</div>
			</div>
		);
	}
}