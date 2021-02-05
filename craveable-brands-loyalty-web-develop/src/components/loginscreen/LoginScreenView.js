import React, { Component } from 'react';
import Master from 'components/master/Master';
import CommonInfoBox from 'components/common/CommonInfoBox';
import Images from '../../img/Image';

export default class LoginScreen extends Component {

	render() {
		return (
			<Master>
				<div className="login">
					<div className="rewards-logo">
						<img src={Images.Oporto.rewardsLogo} alt="" />
					</div>
					<CommonInfoBox 
						title="sign in"
						buttonText="sign in"
					>
						<input 
							type='text' 
							name='signin'
							placeholder='Your email or phone number'
						/>
						<input 
							type='text' 
							name='password'
							placeholder='Password'
						/>
					</CommonInfoBox>
				</div>
			</Master>
		)
	}
}