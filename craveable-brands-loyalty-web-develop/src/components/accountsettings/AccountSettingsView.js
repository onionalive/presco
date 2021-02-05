import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from 'components/common/Button';
import Images from '../../img/Image';

/**
 * TODO: 
 * Add Tranxactor
 * Add Edit Password & Edit Phone buttons once screens/pathways
 * have been created
 */

export default class AccountSettings extends Component {

	state = {
		editable: false,
		editedEmail: '',
		showErrorEmptyEmail: false,
		showErrorInvalidEmail: false
	}

	updateEditable = async (e) => {
		e.preventDefault();
		const { editable, showErrorInvalidEmail, showErrorEmptyEmail } = this.state;

		if (showErrorEmptyEmail || showErrorInvalidEmail) {
			return;
		}

		if (editable) {
			const { editedEmail } = this.state;

			const updatedData = {};
			let sendUpdate = false;

			if (editedEmail !== '') {
				updatedData.email = editedEmail;
				sendUpdate = true;
			}

			if (sendUpdate) {
				// needs to be updated with Tranxactor
				this.props.goUpdateProfile(updatedData);
			}
		}

		this.setState({
			...this.state,
			editable: !editable
		});
	}

	render() {
		const { email, phone } = this.props;
		const { editable, editedEmail, showErrorInvalidEmail, showErrorEmptyEmail } = this.state;

		return (
			<div className="secondary-container account-settings">
				<div className="tab-row">
					<Link to="/profile" className="tab">
						<h3>Profile Details</h3>
					</Link>
					<Link to="/account-settings" className="tab active">
						<h3 className="active">Account Settings</h3>
						<div className="active-border-bottom"></div>
					</Link>
				</div>
				<div className="contact-details-container">
					<div className="row heading">
						<h3>Contact details</h3>
					</div>
					<div className="row">
						<div className="field">
							<label htmlFor="emailInput" className="field-name">Email</label>
							<input 
								id="emailInput"
								type="email" 
								name="email" 
								placeholder={email}
								readOnly={editable ? false : true}
								onChange={(text) => {
									this.setState({
										...this.state,
										editedEmail: text.target.value,
										showErrorEmptyEmail: text.target.valuelength === 0 ? true : false,
										showErrorInvalidEmail: text.target.value.includes('@') ? false : true
									});
								}}
							/>
							<span className={editable && (showErrorEmptyEmail || showErrorInvalidEmail) ? 'error-message show' : 'error-message'}>
								{showErrorInvalidEmail && 'Error: A valid email address must be provided'}
								{showErrorEmptyEmail && 'Error: The email field cannot be empty'}
							</span>
						</div>
						<div className="field">
							<label htmlFor="passwordInput" className="field-name">Password</label>
							<input 
								id="passwordInput"
								type="password" 
								name="password" 
								placeholder="********" 
							/>
						</div>
						<div className="field">
							<label htmlFor="phoneInput" className="field-name">Phone number</label>
							<input 
								id="phoneInput"
								type="tel" 
								name="phone" 
								placeholder={phone} 
							/>
						</div>
					</div>
				</div>
				<div className="contact-preferences-container">
					<div className="row heading">
						<h3>Contact preferences</h3>
					</div>
					<Link to="#placeholder" className="edit-options">
						<p>Contact preferences</p>
						<img src={Images.Oporto.chevronRightBlack} alt="" />
					</Link>
					<Link to="#placeholder" className="edit-options">
						<p>Change password</p>
						<img src={Images.Oporto.chevronRightBlack} alt="" />
					</Link>
				</div>
				<Button
					buttonText={editable ? 'Save' : 'Edit Details'}
					buttonClass={editable ? 'button save' : 'button'}
					onClick={this.updateEditable}
					href="#"
				/>
			</div>
		);
	}
}