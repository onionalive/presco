import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Master from '../master/Master';
// import Grid from '../grid/Grid';
// import Item from '../grid/Grid';
// import Button from '../button/Button';
// import Dropdown from '../dropdown/Dropdown';
/* user imports */
// import Data from './Home.json';
import Loading from '../loading/Loading';

class Home extends Component {
	render() {
		return (
			<Master>
				<div className="home">
					<Loading />
				</div>
			</Master>
		);
	}
}

Home.propTypes = {
	example: PropTypes.string
}

export default Home;
