import React, { Component } from 'react';
import Master from 'components/master/Master';
import CommonInfoBox from 'components/common/CommonInfoBox';
import Images from '../../img/Image';

export default class Signup extends Component {


	render() {
		return (
			<Master>
				<div className="signup">
					<div className="rewards-logo">
						<img src={Images.Oporto.rewardsLogo} alt="" />
					</div>
					<CommonInfoBox
						title='Set up your account'
						body=""
						placeholder="Your name"
						validator=""
						inputType="text"
						inputName="name"
						buttonText="next"
					>
						<input 
							type='text' 
							name='username'
							placeholder='Username'
						/>
					</CommonInfoBox>
				</div>
			</Master>
		);
	}
}