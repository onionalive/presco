import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, KeyboardAvoidingView, Image, Platform } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Col, Row, Grid } from "react-native-easy-grid";

/* user imports */
import Button from 'app/components/common/Button';
import InputField from 'app/components/common/InputField';
import QRCodeScreen from 'app/components/common/QRCodeScreen';
import Images from 'app/img/Image';

export const TYPE_TEXT 					= 'TYPE_TEXT';
export const TYPE_TWO_INPUT				= 'TYPE_TWO_INPUT';
export const TYPE_CAMERA 				= 'TYPE_CAMERA';
export const TYPE_CAMERA_DISABLED 		= 'TYPE_CAMERA_DISABLED';
export const TYPE_TWO_BUTTON	 		= 'TYPE_TWO_BUTTON';
export const TYPE_GRID	 				= 'TYPE_GRID';
export const TYPE_QUESTIONNAIRE	 		= 'TYPE_QUESTIONNAIRE';
export const TYPE_NO_BUTTON 			= 'TYPE_NO_BUTTON';
class CommonInfoBox extends Component {
	state = { 
		exampleState: [],
		placeholderLength: false,
		placeholderTwoLength: false,
		text: '',
		textTwo: '',
		success: false,
		isValid: false,
		selectedBoxes: []
	};

	onChangeText = (text) => {
		if (this.state.success) {
			this.transitionFromSuccess();
		}

		if (text.length) {
			this.setState({
				...this.state,
				placeholderLength: true,
				text: text
			});

			if (this.props.updateAction) this.props.updateAction(text);
		} else {
			this.setState({
				...this.state,
				placeholderLength: false,
				text: text
			});
		}
	}

	transitionShow(reference) {
		reference.transitionTo({
			opacity: 1
		});
	}

	transitionHide(reference) {
		reference.transitionTo({
			opacity: 0
		});
	}

	transitionFromSuccess() {
		this.refs.nextButton.transitionTo({
			zIndex: 50
		});

		this.refs.success.transitionTo({
			zIndex: 0
		});
	}

	transitionToValid() {
		this.setState({
			...this.state,
			isValid: true
		});
	}

	transitionToInvalid() {
		this.setState({
			...this.state,
			isValid: false
		});
	}

	handleNext = async () => {
		const { action } = this.props;
		const nowValid = await this.validate();

		if (this.state.isValid || nowValid) {
			this.refs.nextButton.transitionTo({
				zIndex: 0
			});
	
			this.refs.success.transitionTo({
				zIndex: 50
			});
	
			this.setState({
				...this.state,
				success: true
			});
	
			setTimeout(() => {
				action();
			}, 100);
		}
	}

	/**
	 * Another useless, rushed function
	 */
	handleNextTwoInput() {
		const { action } = this.props;

		// debug mode - get rid of 
		// if (true) {
		if (this.state.isValid) {
			this.refs.nextButton.transitionTo({
				zIndex: 0
			});
	
			this.refs.success.transitionTo({
				zIndex: 50
			});
	
			this.setState({
				...this.state,
				success: true
			});
	
			setTimeout(() => {
				action();
			}, 100);
		}
	}

	handleCameraNext(text) {
		const { action } = this.props;
		const nowValid = this.validate();

		if (this.state.isValid || nowValid) {
			if (this.props.updateAction) this.props.updateAction(text);

			this.setState({
				...this.state,
				success: true
			});
	
			setTimeout(() => {
				action();
			}, 100);
		}
	}

	onFocus() {
		this.refs.placeholderOne.transitionTo({
			top: -8,
			fontSize: 10,
			color: Colours.cWhite
		});
	}

	onBlur() {
		if (!this.state.placeholderLength) {
			this.refs.placeholderOne.transitionTo({
				top: 14,
				fontSize: 14,
				color: Colours.cGrey
			});
		}
		this.validate();
	}

	validate = async () => {
		if (this.props.validator) {
			const valid = await this.props.validator(this.state.text);

			console.log('VALID', valid);
			if (!valid.status) {
				if (this.refs.errorMessageOne) this.transitionShow(this.refs.errorMessageOne);
				this.transitionToInvalid();
				this.props.updateError(valid.message);
				return false;
			} else {
				if (this.refs.errorMessageOne) this.transitionHide(this.refs.errorMessageOne);
				this.transitionToValid();
				return true;
			}
		}
	}

	basicInput = () => {
		const { title, body, placeholder, action, validator, isValid, error, keyboardType, secureTextEntry } = this.props;
		const { textStyle, initStyle, flexCenter, titleStyle, bodyTextStyle } = styles;

		return (
			<KeyboardAvoidingView 
				keyboardVerticalOffset={100}
				behavior={'position'}
				style={{
					width: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40
				}}
			>
				<Text style={[titleStyle]}>{title}</Text>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20,
					paddingLeft: 40,
					paddingRight: 40
				}, bodyTextStyle]}>{body}</Text>
				<View style={{
					position: 'relative',
					marginTop: 20
				}}>
					<Animatable.Text 
						ref="placeholderOne"
						style={[{
							color: Colours.cWhite,
							position: 'absolute',
							top: 14,
							left: 20,
							color: Colours.cGrey
					}]}>
						{placeholder}
					</Animatable.Text>
					<InputField
						placeholder={''}
						onChangeText={this.onChangeText}
						underlineColor={Colours.cPrimary}
						onFocus={() => this.onFocus()}
						onBlur={() => this.onBlur()}
						keyboardType={keyboardType ? keyboardType : 'default'}
						secureTextEntry={secureTextEntry ? secureTextEntry : false}
						alt
					/>
					<Animatable.Text
						ref="errorMessageOne" 
						style={{
							opacity: 0,
							marginLeft: 20,
							marginRight: 20,
							color: Colours.cYellow,
					}}>{error}</Animatable.Text>
				</View>
			</KeyboardAvoidingView>
		);
	}

	/**
	 * twoInputs section is really ugly code but
	 * we don't really have time left to care
	 * for v1.0
	 */
	twoInputs = () => {
		const { title, body, placeholder, action, validator, isValid, error, keyboardType, secureTextEntry, placeholderTwo, errorTwo } = this.props;
		const { textStyle, initStyle, flexCenter, titleStyle, bodyTextStyle } = styles;

		return (
			<KeyboardAvoidingView 
				keyboardVerticalOffset={100}
				behavior={'position'}
				style={{
					width: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40
				}}
			>
				<Text style={[titleStyle]}>{title}</Text>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20,
					paddingLeft: 40,
					paddingRight: 40
				}, bodyTextStyle]}>{body}</Text>
				<View style={{
					position: 'relative',
					marginTop: 20
				}}>
					<Animatable.Text 
						ref="placeholderOne"
						style={[{
							color: Colours.cWhite,
							position: 'absolute',
							top: 14,
							left: 20,
							color: Colours.cGrey
					}]}>
						{placeholder}
					</Animatable.Text>
					<InputField
						placeholder={''}
						onChangeText={this.onChangeText}
						underlineColor={Colours.cPrimary}
						onFocus={() => this.onFocus()}
						onBlur={() => {
							if (!this.state.placeholderLength) {
								this.refs.placeholderOne.transitionTo({
									top: 14,
									fontSize: 14,
									color: Colours.cGrey
								});
							}

							if (this.props.validator) {
								const valid = this.props.validator(
									this.state.text,
									this.state.textTwo
								);

								if (!valid.status && valid.type === 'firstName') {
									if (this.refs.errorMessageOne) this.transitionShow(this.refs.errorMessageOne);
									this.transitionToInvalid();
									this.props.updateError(valid.message);
									return false;
								} else if (!valid.status && valid.type === 'lastName') {
									// if (this.refs.errorMessageTwo) this.transitionShow(this.refs.errorMessageTwo);
									this.transitionToInvalid();
									this.props.updateError(valid.message);
									return false;
								} else {
									if (this.refs.errorMessageOne) this.transitionHide(this.refs.errorMessageOne);
									if (this.refs.errorMessageTwo) this.transitionHide(this.refs.errorMessageTwo);
									this.transitionToValid();
									return true;
								}
							}
						}}
						keyboardType={keyboardType ? keyboardType : 'default'}
						secureTextEntry={secureTextEntry ? secureTextEntry : false}
						alt
					/>
					<Animatable.Text
						ref="errorMessageOne" 
						style={{
							opacity: 0,
							marginLeft: 20,
							marginRight: 20,
							color: Colours.cYellow,
					}}>{error}</Animatable.Text>
				</View>
				<View style={{
					position: 'relative',
					marginTop: 20
				}}>
					<Animatable.Text 
						ref="placeholderTwo"
						style={[{
							color: Colours.cWhite,
							position: 'absolute',
							top: 14,
							left: 20,
							color: Colours.cGrey
					}]}>
						{placeholderTwo}
					</Animatable.Text>
					<InputField
						placeholder={''}
						onChangeText={(text) => {
							if (this.state.success) {
								this.transitionFromSuccess();
							}
					
							if (text.length) {
								this.setState({
									...this.state,
									placeholderTwoLength: true,
									textTwo: text
								});
					
								if (this.props.updateActionTwo) this.props.updateActionTwo(text);
							} else {
								this.setState({
									...this.state,
									placeholderTwoLength: false,
									textTwo: text
								});
							}
						}}
						underlineColor={Colours.cPrimary}
						onFocus={() => {
							this.refs.placeholderTwo.transitionTo({
								top: -8,
								fontSize: 10,
								color: Colours.cWhite
							});
						}}
						onBlur={() => {
							if (!this.state.placeholderTwoLength) {
								this.refs.placeholderTwo.transitionTo({
									top: 14,
									fontSize: 14,
									color: Colours.cGrey
								});
							}

							if (this.props.validator) {
								const valid = this.props.validator(
									this.state.text,
									this.state.textTwo
								);

								if (!valid.status && valid.type === 'lastName') {
									if (this.refs.errorMessageTwo) this.transitionShow(this.refs.errorMessageTwo);
									this.transitionToInvalid();
									this.props.updateError(valid.message);
									return false;
								} else if (!valid.status && valid.type === 'firstName') {
									// if (this.refs.errorMessageOne) this.transitionShow(this.refs.errorMessageOne);
									this.transitionToInvalid();
									this.props.updateError(valid.message);
									return false;
								} else {
									if (this.refs.errorMessageOne) this.transitionHide(this.refs.errorMessageOne);
									if (this.refs.errorMessageTwo) this.transitionHide(this.refs.errorMessageTwo);
									this.transitionToValid();
									return true;
								}
							}
						}}
						keyboardType={keyboardType ? keyboardType : 'default'}
						secureTextEntry={secureTextEntry ? secureTextEntry : false}
						alt
					/>
					<Animatable.Text
						ref="errorMessageTwo" 
						style={{
							opacity: 0,
							marginLeft: 20,
							marginRight: 20,
							color: Colours.cYellow,
					}}>{errorTwo}</Animatable.Text>
				</View>
			</KeyboardAvoidingView>
		);
	}

	questionnaire = () => {
		const { action, validator, isValid, error, keyboardType, secureTextEntry, options } = this.props;
		const { rowStyles, columnStyles, viewBorderStyles, viewSelectStyles, optionTextStyle } = gridStyles;

		const selected = {
			borderColor: Colours.cPrimary,
		}

		/**
		 * Update state for whether or not
		 * the box is being selected or deselected
		 */
		const updateSelectedBoxes = (text) => {
			let selectedBoxes = this.state.selectedBoxes;
			if (selectedBoxes.includes(text)) {
				selectedBoxes = selectedBoxes.filter(d => d !== text);
			} else {
				selectedBoxes.push(text);
			}

			this.setState({
				...this.state,
				selectedBoxes: selectedBoxes
			});
		}

		/**
		 * Return style object for if the
		 * box has been selected
		 */
		const isSelectedState = (text) => {
			const value = this.state.selectedBoxes.includes(text) ?
				selected :
				null;
			return value;
		}

		/**
		 * Render over all the options from 
		 * Firebase for analytics and return
		 * the correct amount of rows and 
		 * columns
		 */
		const renderOptions = () => {
			const renderOption = (option, indexSelected) => (
				<Col style={columnStyles}>
					<View style={viewBorderStyles}>
						<Button
							action={() => updateSelectedBoxes(option)}
							style={{flex: 1}}
						>
							<View style={[viewSelectStyles,indexSelected]}>
								<Text style={optionTextStyle}>{option}</Text>
							</View>
						</Button>
					</View>
				</Col>
			);

			return options.map((d, i) => {
				if (i % 2 === 0) {
					let selectedIndexOne, selectedIndexTwo;

					selectedIndexOne = isSelectedState(options[i]);
					if (i+1 < options.length) selectedIndexTwo = isSelectedState(options[i+1]);
					return (
						<Row key={i} style={rowStyles}>
							{ renderOption(options[i], selectedIndexOne) }
							{ i+1 < options.length && renderOption(options[i+1], selectedIndexTwo) }
						</Row>
					);
				} else {
					return null;
				}
			}).filter(d => d !== null);
		}

		return (
			<KeyboardAvoidingView 
				keyboardVerticalOffset={100}
				behavior={'position'}
				style={{
					width: '100%',
					height: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40
				}}
			>
				<Grid>
					{ renderOptions() }
				</Grid>
			</KeyboardAvoidingView>
		);
	}

	basicTextDisplay = () => {
		const { title, body, action, validator, isValid, error, keyboardType } = this.props;
		const { textStyle, initStyle, flexCenter, titleStyle, bodyTextStyle } = styles;

		return (
			<KeyboardAvoidingView 
				keyboardVerticalOffset={100}
				behavior={'position'}
				style={{
					width: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40
				}}
			>
				<Text style={[titleStyle]}>{title}</Text>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20,
					paddingLeft: 40,
					paddingRight: 40
				}, bodyTextStyle]}>{body}</Text>
			</KeyboardAvoidingView>
		);
	}

	cameraView() {
		const { title, body, placeholder, action, validator, isValid, error, keyboardType, secureTextEntry } = this.props;
		const { textStyle, initStyle, flexCenter, titleStyle, bodyTextStyle } = styles;

		return (
			<KeyboardAvoidingView 
				keyboardVerticalOffset={100}
				behavior={'position'}
				style={{
					width: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40
				}}
			>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20,
					marginBottom: 20
				}, titleStyle]}>{title}</Text>
				<QRCodeScreen forward={(text) => this.handleCameraNext(text)} />
			</KeyboardAvoidingView>
		);
	}

	cameraDisabledView = () => {
		const { title, body, action, validator, isValid, error, keyboardType, buttonText } = this.props;
		const { textStyle, initStyle, flexCenter, titleStyle, bodyTextStyle } = styles;

		return (
			<View
				style={{
					width: '100%',
					backgroundColor: Colours.cOffBlack,
					zIndex: 40,
					height: '100%'
				}}
			>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20
				}, titleStyle]}>{title}</Text>
				<Text style={[{
					color: Colours.cWhite,
					paddingTop: 20,
					paddingLeft: 40,
					paddingRight: 40,
					paddingBottom: Platform.OS === 'android' ? 20 : null
				}, bodyTextStyle]}>{body}</Text>
				<Image source={Images.cameraIcon} style={{
						marginTop: 30,
						width: 40,
						height: 40,
						alignSelf: 'center',
						marginBottom: 0
					}} />
				<Button 
					style={[buttonStyles.button, {
						backgroundColor: Colours.cPrimary,
						position: 'absolute',
						bottom: 0
					}]} 
					action={() => action()}
					underlayColor={Colours.cPrimaryUnderlay}
				>
					<Text style={[buttonStyles.text, {color: Colours.cWhite }]}>{buttonText || 'Enable your camera'}</Text>
				</Button>
			</View>
		);
	}

	renderTwoButtons() {
		const { 
			title, 
			placeholder, 
			helper, 
			actionLeft, 
			actionRight, 
			validator, 
			buttonTextLeft, 
			buttonTextRight, 
			type,
			underlayColor
		} = this.props;
		const { isValid } = this.state;  
		const { textStyle, initStyle, flexCenter, titleStyle, helperTextStyle } = styles;

		const nextButtonStyles = isValid ? 
			[buttonStyles.twoButtonRight, buttonStyles.twoButtonSuccess] :
			[buttonStyles.twoButtonRight];

		const nextButtonText = isValid ?
			[buttonStyles.text, buttonStyles.textValid] :
			[buttonStyles.text];

		return (
			<View style={{
				position: 'absolute',
				width: '100%',
				bottom: 0,
				left: 0,
				zIndex: 50,
				minHeight: Platform.OS === 'android' ? 100 : null
			}}>
				<View 
					key="nextButton"
					style={{
						position: 'absolute',
						width: '50%',
						bottom: 0,
						left: 0,
						zIndex: 50,
						minHeight: Platform.OS === 'android' ? 100 : null
					}}
				>
					<Button 
						style={buttonStyles.twoButtonLeft} 
						action={() => actionLeft()}
						underlayColor={isValid ? Colours.cPrimary : Colours.cNearlyBlack}
					>
						<Text style={nextButtonText}>{buttonTextLeft ? buttonTextLeft : 'cancel'}</Text>
					</Button>
				</View>
				<View 
					key="success"
					style={{
						position: 'absolute',
						width: '50%',
						bottom: 0,
						right: 0,
						zIndex: 0,
						minHeight: Platform.OS === 'android' ? 100 : null
					}}
				>
					<Button 
						underlayColor={underlayColor ? underlayColor : Colours.cGreen}
						style={buttonStyles.twoButtonRight}
						action={() => actionRight()}>
						<Text style={buttonStyles.textSuccess}>{buttonTextRight ? buttonTextRight : 'ok'}</Text>
					</Button>
				</View>
			</View>
		);
	}

	renderAnimatedButton() {
		const { title, placeholder, helper, action, validator, button, type } = this.props;
		const { isValid } = this.state;  
		const { textStyle, initStyle, flexCenter, titleStyle, helperTextStyle } = styles;

		const nextButtonStyles = isValid ? 
			[buttonStyles.button, buttonStyles.valid] :
			[buttonStyles.button];

		const nextButtonText = isValid ?
			[buttonStyles.text, buttonStyles.textValid] :
			[buttonStyles.text];

		if (button) {
			return (
				[
					<Animatable.View 
						key="nextButton"
						ref="nextButton"
						style={{
							position: 'absolute',
							width: '100%',
							bottom: 0,
							zIndex: 50,
							minHeight: Platform.OS === 'android' ? 100 : null
						}}
					>
						<Button 
							style={[nextButtonStyles, buttonStyles.buttonHeight]} 
							action={() => {
								if (this.props.type && this.props.type === TYPE_TWO_INPUT) {
									this.handleNextTwoInput();
								} else {
									this.handleNext();
								}
							}}
							underlayColor={isValid ? Colours.cPrimary : Colours.cNearlyBlack}
						>
							<Text style={[nextButtonText]}>{button}</Text>
						</Button>
					</Animatable.View>,
					<Animatable.View 
						key="success"
						ref="success"
						style={{
							position: 'absolute',
							width: '100%',
							bottom: 0,
							zIndex: 0,
							minHeight: Platform.OS === 'android' ? 100 : null
						}}
					>
						<Button 
							underlayColor={Colours.cGreen}
							style={[buttonStyles.success, buttonStyles.buttonHeight]}
							action={() => action()}>
							<Image 
								source={Images.tickWhite} 
							/>
						</Button>
					</Animatable.View>
				]
			);
		} else {
			return null;
		}
	}

	/**
	 * Exported types define what kind of 
	 * Common Info Box to render
	 */
	renderType() {
		const {type} = this.props;
		switch(type) {
			case TYPE_TEXT:
				return this.basicTextDisplay();
			case TYPE_CAMERA:
				return this.cameraView();
			case TYPE_CAMERA_DISABLED:
				return this.cameraDisabledView();
			case TYPE_TWO_BUTTON:
				return this.basicTextDisplay();
			case TYPE_QUESTIONNAIRE:
				return this.questionnaire();
			case TYPE_TWO_INPUT:
				return this.twoInputs();
			default:
				return this.basicInput();
		}
	}

	render() {
		try {
			const { title, placeholder, helper, action, validator, button, type, buttonType } = this.props;
			const { isValid } = this.state;  
			const { textStyle, initStyle, flexCenter, titleStyle, helperTextStyle } = styles;

			const nextButtonStyles = isValid ? 
				[buttonStyles.button, buttonStyles.valid] :
				[buttonStyles.button];

			const nextButtonText = isValid ?
				[buttonStyles.text, buttonStyles.textValid] :
				[buttonStyles.text];

			// console.log(this.state.selectedBoxes);

			return (
				<View
				style={{
					height: 320,
					width: '100%',
					backgroundColor: Colours.cOffBlack
				}}>
					<Animatable.View>
					{/*<LinearGradient
						start={{x: 0.0, y: 1.0}} 
						end={{x: 0.0, y: 1.0}}
						colors={['#000', '#192f6a']}
						style={{
							width: '100%',
							height: 100
						}} />*/}
					</Animatable.View>
					{this.renderType()}
					{ 
						buttonType === TYPE_TWO_BUTTON ? 
						this.renderTwoButtons() :
						this.renderAnimatedButton()
					}
					{helper && 
						<Text style={[{
							color: Colours.cGrey,
							backgroundColor: 'transparent',
							position: 'absolute',
							bottom: -40,
							alignItems: 'center',
							width: '100%'
						}, helperTextStyle]}>{helper}</Text>
					}
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleStyle: {
		...Fonts.fHeadingMedium,
		textAlign: 'center',
		color: Colours.cWhite,
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10
	},
	bodyTextStyle: {
		...Fonts.fBodyText,
		textAlign: 'center'
	},
	helperTextStyle: {
		...Fonts.fUtility,
		textAlign: 'center',
		lineHeight: 16
	}
};

const buttonStyles = {
    button: {
		position: 'absolute',
		bottom: 0,
        backgroundColor: Colours.cNearlyBlack,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
		minWidth: 180,
		alignItems: 'center',
		width: '100%'
	},
	buttonHeight: {
		height: 40
	},
	success: {
		position: 'absolute',
		bottom: 0,
        backgroundColor: Colours.cGreen,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        minWidth: 180,
		alignItems: 'center',
		width: '100%'
	},
	twoButtonLeft: {
		position: 'absolute',
		bottom: 0,
        backgroundColor: Colours.cNearlyBlack,
		paddingTop: 12,
		paddingBottom: 12,
		alignItems: 'center',
		width: '100%'
	},
	twoButtonRight: {
		position: 'absolute',
		bottom: 0,
        backgroundColor: Colours.cPrimary,
		paddingTop: 12,
		paddingBottom: 12,
		alignItems: 'center',
		width: '100%'
	},
	twoButtonSuccess: {
        backgroundColor: Colours.cGreen,
	},
    text: {
        ...Fonts.fPrimary,
        color: Colours.cGrey,
        fontSize: 14
	},
	textValid: {
		color: Colours.cWhite
	},
	textSuccess: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
	},
	valid: {
		backgroundColor: Colours.cPrimary
	}
}

const gridStyles = {
	rowStyles: {
		height: 70, 
		width: '100%'
	},
	columnStyles: {
		height: 70, 
		width: '50%'
	},
	viewBorderStyles: {
		display: 'flex',
		height: '100%',
		width: '100%',
		padding: 6
	},
	viewSelectStyles: {
		flex: 1,
		borderWidth: 1,
		borderColor: Colours.cWhite,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	optionTextStyle: {
		...Fonts.fUtility,
		color: Colours.cWhite,
		textAlign: 'center'
	}
}

export default CommonInfoBox;
