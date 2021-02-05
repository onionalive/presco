import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from 'components/common/Button';

export default class ProfileDetails extends Component {

	state = {
		editable: false,
		editedFirstName: '',
		editedBirthday: '',
		editedAddress: '',
		showErrorFirstName: false,
		showErrorBirthday: false,
		showErrorAddress: false
	}

	updateEditable = async (e) => {
		e.preventDefault();
		const { 
			editable, 
			showErrorFirstName,
			showErrorBirthday,
			showErrorAddress
		} = this.state;

		if (
			showErrorFirstName ||
			showErrorBirthday ||
			showErrorAddress
		) {
			return;
		}

		if (editable) {
			const { editedFirstName, editedBirthday, editedAddress } = this.state;

			/**
			 * TODO:
			 * Update to deal with Tranxactor
			 */
			const updatedData = {};
			let sendUpdate = false;

			if (editedFirstName !== '') {
				updatedData.firstName = editedFirstName;
				sendUpdate = true;
			}

			if (editedBirthday !== '') {
				updatedData.birthday = editedBirthday;
				sendUpdate = true;
			}

			if (editedAddress !== '') {
				updatedData.address = editedAddress;
				sendUpdate = true;
			}

			/**
			 * Ensure updated Profile Details
			 * are updated across the site
			 * 
			 * Needs to be updated with merged/resolved data
			 * from Tranxactor 
			 * This will fix current issue of empty placeholders
			 * when data is saved (currently getting overwritten)
			 */
			if (sendUpdate) {
				// temporary
				if (!updatedData.firstName) {
					updatedData.firstName = this.props.profile.firstName;
				}

				if (!updatedData.birthday) {
					updatedData.birthday = this.props.profile.birthday;
				}

				if (!updatedData.address) {
					updatedData.address = this.props.profile.address;
				}

				this.props.goUpdateProfile(updatedData);
			}
		}

		this.setState({
			...this.state,
			editable: !editable
		});
	}

	render() {
		const { firstName, birthday, address } = this.props.profile;
		const { editable, editedFirstName, editedBirthday, editedAddress, showErrorFirstName, showErrorBirthday, showErrorAddress } = this.state;

		return (
			<div className="secondary-container profile-details">
				<div className="tab-row">
					<Link to="/profile" className="tab active">
						<h3 className="active">Profile Details</h3>
						<div className="active-border-bottom"></div>
					</Link>
					<Link to="/account-settings" className="tab">
						<h3>Account Settings</h3>
					</Link>
				</div>
				<div className="row">
					<div className="field">
						<label htmlFor="firstNameInput" className="field-name">First name</label>
						<input 
							id="firstNameInput"
							type="text" 
							name="name" 
							placeholder={firstName} 
							readOnly={editable ? false : true} 
							onChange={(text) => {
								this.setState({
									...this.state,
									editedFirstName: text.target.value,
									showErrorFirstName: text.target.value.length === 0 ? true : false
								});
							}}
						/>
						<span className={editable && showErrorFirstName ? 'error-message show' : 'error-message'}>
							Error: The name field cannot be empty
						</span>
					</div>
					<div className="field">
						<label htmlFor="birthdayInput" className="field-name">Birthday</label>
						<input 
							id="birthdayInput"
							type="date" 
							name="birthday" 
							placeholder={birthday} 
							readOnly={editable ? false : true} 
							onChange={(value) => {
								this.setState({
									...this.state,
									editedBirthday: value.target.value,
									showErrorBirthday: value.target.value.length === 0 ? true : false
								});
							}}
						/>
						<span className={showErrorBirthday ? 'error-message show' : 'error-message'}>
							Error: The birthday field cannot be empty
						</span>
					</div>
					<div className="field">
						<label htmlFor="addressInput" className="field-name">Your delivery address</label>
						<input 
							id="addressInput"
							type="text" 
							name="address" 
							placeholder={address} 
							readOnly={editable ? false : true} 
							onChange={(text) => {
								this.setState({
									...this.state,
									editedAddress: text.target.value,
									showErrorAddress: text.target.value.length === 0 ? true : false
								});
							}}
						/>
						<span className={showErrorAddress ? 'error-message show' : 'error-message'}>
							Error: The address field cannot be empty
						</span>
					</div>
				</div>
				<div className="map-container">
					<div className="row store-info">
						<div className="field">
							<p className="field-name">Your favourite store</p>
							<p><span className="location">Campbelltown</span><span className="distance">9999km away</span></p>
						</div>
					</div>
					<div className="row">
						<img src="https://via.placeholder.com/1000x237" alt="" />
					</div>
				</div>
				<div className="row">
					<div className="card-container">
						<div className="text-container">
							<p>Linked cards</p>
							<Link to="#placeholder">Add a card</Link>
						</div>
						<img src="https://via.placeholder.com/271x154" alt="" />
					</div>
				</div>
				<Button 
					buttonText={editable ? 'Save' : 'Edit Details'}
					buttonClass={editable ? 'button save' : 'button'}
					onClick={this.updateEditable}
					href="#"
				/>
			</div>
		)
	}
}