import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Master from 'components/master/Master';
import RowTiles from 'components/common/RowTiles';
import Tile from 'components/common/SingleTile';
import Button from 'components/common/Button';
import Images from '../../img/Image';
// import axios from 'axios';
/* user imports */
// import data from './Home.json';
// import surf from 'img/surf.jpg';

// This is having an issue with the bable compiler
// - chat to Dennis about this
// import { Tranxactor } from 'common';
// const { initTest } = Tranxactor;
/**
 * Testing
 * 
 * NOTES:
 * What you need to do to have the commmon folders work
 * is to import from either a symlink or just copy/paste
 * the folder across relative from the app common folder
 */
class Home extends Component {
	constructor(props) {
		super();
	}

	componentDidMount() {
		// This is having an issue with the bable compiler
		// - chat to Dennis about this
		// Read the above
		// const test = initTest();
		// console.log(test);
	}

	/**
	 * Render the <Home /> component
	 * @return {Home} Home page component
	 */
	render() {
		const loggedIn = true;

		return (
			<Master>
				<div className="home">

					{ loggedIn ?
						<div className="loggedin">
							<div className="secondary-container">
								<RowTiles 
									type="offer"
									title="Offers"
									notch={true}
								/>
							</div>
							<div className="home-divider">
								<Link to="#placeholder">Need help?</Link>
							</div>
							<div className="secondary-container">
								<RowTiles 
									type="promo"
									title="What's New"
								/>
							</div>
						</div>
					: 
					<div className="landing-page">
						<div className="home-carousel">
							<div className="secondary-container">
								<img src={Images.Oporto.rewardsLogo} alt="" />
								<p className="copy">Join Flame Rewards, Australia's hottest rewards program</p>
								<Button 
									buttonText='Get Started'
								/>
								<span className="login-text">Already have an account? <Link to="/login">Login</Link></span>
							</div>
						</div>
						<div className="home-overview">
							<div className="secondary-container">
								<div className="row">
									<div className="offers-teaser">
										<Tile
											type="offer" 
										/>
										<h3>Offers</h3>
										<p>Exclusive member offers events &amp; competitions.</p>
									</div>
									<div className="status-teaser">
										<div className="image-container">
											<img src="https://via.placeholder.com/300x220" alt=""/>
										</div>
										<h3>Status</h3>
										<p>Earn points to enjoy benefits exclusive to orange, silver, gold and platinum levels.</p>
									</div>
									<div className="promos-teaser">
										<Tile
											type="promo"
										/>
										<h3>Promotions</h3>
										<p>Be the first to know about our latest promotions.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					}
				</div>
			</Master>
		);
	}
}

Home.propTypes = {
	example: PropTypes.string
}

export default Home;
