import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppPromo from 'components/common/AppPromo';
import Header from 'components/Header';
import Tranxactor from 'common/Tranxactor';
import Cookie from 'utils/Cookie';
import firebase from 'firebase';
	// required for side-effects:
	import 'firebase/firestore';
import Config from 'config';

/* user imports */

class Master extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		const token = Cookie.getCookie('token');
		if (token !== null){
			this.props.goUpdateProfile({ 
				...this.props.profile,
				token
			});

			const userDetails = await Tranxactor.getUserDetails(token);
			if (userDetails.status == 200) {
				this.props.goUpdateProfile({
					...this.props.profile,
					...userDetails.data
				});
			}
		}

		// set up firebase and content fetch
		firebase.initializeApp(Config.firebaseConfig);
		const database = firebase.firestore();
		this.props.goUpdatePromos(database);
		this.props.goUpdateCopy(database);
	}

	render() {
		return (
			<div className="master">
				<Header 
					name={this.props.profile.firstName}
					loyaltyBalance={this.props.loyaltyBalance}
				/>
				{ this.props.children }
				<AppPromo />
			</div>
		);
	}
}

Master.propTypes = {
	example: PropTypes.string
}

export default Master;
