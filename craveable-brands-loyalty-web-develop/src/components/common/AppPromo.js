import React from 'react';
import Images from '../../img/Image';

export default class AppPromo extends React.Component {

	render() {

		return(
			<div className="app-promo-container">
				<div className="content-container">
					<div className="text-wrapper">
						<h2 className="cta">Ditch the card and go digital</h2>
						<p className="cta-copy">Cop the Oporto App and start earning Flame Rewards now! Plus exclusive member offers, events &amp; competitions.</p>
						<div className="logo-container">
							<img src="https://via.placeholder.com/155x45" alt="playstore placeholder" />
							<img src="https://via.placeholder.com/155x45" alt="appstore placeholder" />
						</div>
					</div>
					<div className="image-wrapper">
						<img src={Images.phonePromo} alt=""/>
					</div>
				</div>
			</div>
		);
	}
}