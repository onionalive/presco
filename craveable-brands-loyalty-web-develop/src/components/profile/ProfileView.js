import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';
import ProfileDetails from 'components/profiledetails/ProfileDetails';
import AccountSettings from 'components/accountsettings/AccountSettings';

export default class Profile extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Master>
				<div className="profile">
					<ThirdNav
						title="My Profile"
					/>
					<div>
						{ this.props.location.pathname === '/profile' &&
							<ProfileDetails 

							/>
						}
						{ this.props.location.pathname === '/account-settings' &&
							<AccountSettings />
						}
					</div>
				</div>
			</Master>
		)
	}
}