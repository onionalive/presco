import React, { Component } from 'react';
import Master from 'components/master/Master';
import CommonInfoBox from 'components/common/CommonInfoBox';
import Tranxactor from 'common/Tranxactor';
import Cookie from 'utils/Cookie';
import Images from '../../img/Image';

export default class Signin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	async signin() {
		const res = await Tranxactor.getToken({
			username: this.state.username,
			password: this.state.password
		});

		console.log(res);

		const { status, data } = res;

		if (status == 200) {
			Cookie.setCookie('token', data.token, .5);
			Cookie.setCookie('expiration', data.expiration, .5);
			Cookie.setCookie('userId', data.userId, .5);
			Cookie.setCookie('userName', data.userName, .5);
			let profileData = { 
				...this.props.profile,
				token: data.token
			};

			this.props.goUpdateProfile(profileData);

			const [userDetails, memberships] = [
				await Tranxactor.getUserDetails(data.token),
				await Tranxactor.getIdentifierList(data.userId, data.token)
			];

			this.props.goUpdateProfile({
				...this.props.profile,
				...userDetails.data
			});

		}
	}

	render() {
		console.log('hwer');
		return (
			<Master>
				<div className="signup">
					<div className="rewards-logo">
						<img src={Images.Oporto.rewardsLogo} alt="" />
					</div>
					<CommonInfoBox
						title='Sign in'
						body=""
						buttonText="submit"
						handleClick={() => this.signin()}
					>
						<input 
							type='text' 
							name='username'
							placeholder='Username'
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<input 
							type='text' 
							name='password'
							placeholder='Password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</CommonInfoBox>
				</div>
			</Master>
		);
	}
}