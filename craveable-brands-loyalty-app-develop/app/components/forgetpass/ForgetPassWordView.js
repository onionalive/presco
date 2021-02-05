import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
/* user imports */
import InputField from 'app/components/common/InputField';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import Tranxactor from 'app/common/Tranxactor';
import Images from 'app/img/Image';
import isEmpty from 'lodash/isEmpty';
const { loadingGradient, iconAlert, background } = Images;

class ForgetPassWordView extends Component {

	state = {
		email: '',
		errorMessage: '',
		loading: false,
		success: false,

	}

	dismiss = () => this.props.navigation.goBack();

	isValue = (value) => {
        if (isEmpty(value) || !value.includes('@')) {
            return false;
        }
        return true;
    }

	onSubmit = async () => {
		try {
			const { copy } = this.props;
			const { email, loading } = this.state;
			if(!this.isValue(email)){
				return this.setState({errorMessage: copy.error1});
			}
			this.setState({ 
				...this.state,
				loading: true
			});

			const data = { emailAddress: email }
			const result = await Tranxactor.resetUserPasswordToken(data);
			console.log(result);
			if(result.status === 201){
				this.setState({success: true})
			} else if(result.response && result.response.status === 400 ){
				// console.log(result.response.data.errorMessage);
				if(result.response.data.errorMessage === 'Member not found'){
					this.setState({errorMessage: copy.error2})
				} else {
					this.setState({errorMessage: copy.error3})
				}
			}
		} catch (error) {

		}
		this.setState({
			loading: false
		});
	};


	renderForm() {
		const { copy } = this.props;
		const { textStyle, initStyle, flexCenter, inputField, containerStyle, backgroundStyle, formStyle, errorText } = styles;
		const { signInFailed, loading, success, errorMessage } = this.state;
		const fadeInOut = {
			0: {
			  opacity: 0
			},
			0.5: {
			  opacity: 1
			},
			1: {
			  opacity: 0
			},
		};
		const errorStyle = Platform.OS === 'ios' ? errorText : {}
		const buttonColour = loading ? 
				Colours.cNearlyBlack : 
				Colours.cPrimary;
		return (
			<View 
				style={[ initStyle, containerStyle]}>
				<Image
					style={backgroundStyle}
					source={background}
				/>
				<KeyboardAvoidingView
					keyboardVerticalOffset={20}
					behavior={'position'}
					style={{position: 'relative'}}
					onStartShouldSetResponder={(e) => true}
        			onResponderRelease={(e) => Keyboard.dismiss()}
				>
					<View style={formStyle}>
						<Animatable.Image
							animation={loading ? fadeInOut : null}
							iterationCount="infinite"
							source={loadingGradient}
							style={{
								width: '100%',
								position: 'absolute',
								top: 0,
								opacity: loading ? 1 : 0
							}}
						></Animatable.Image>
						<Text style={{
							...Fonts.fHeadingMedium,
							color: Colours.cWhite,
							textAlign: 'center',
							marginBottom: 30
						}}>{copy.heading}</Text>
						<InputField
							alt
							placeholder={copy.username}
							keyboardType='email-address'
							onChangeText={(text) => {
								this.setState({
									...this.state,
									email: text,
									errorMessage: ''
								});
							}}
						/>
						<View>
							<Button 
								style={[buttonStyles.button, {
									backgroundColor: buttonColour,
									marginTop: 40
								}]} 
								action={loading ? () => console.log('Loading state') : () => this.onSubmit()}
								underlayColor={Colours.cPrimaryUnderlay}
							>
								<Text style={buttonStyles.text}>{copy.button}</Text>
							</Button>
						</View>
					</View>	
					{!!errorMessage && 
							<View style={errorStyle}>
								<Text
									style={{
										...Fonts.fUtility,
										color: Colours.cYellow,
										backgroundColor: Colours.cTransparent,
										textAlign: 'center'
									}}
								>{errorMessage}</Text>
							</View>
						}
				</KeyboardAvoidingView>
				<Button action={() => this.dismiss()}
					style={{
						position: 'absolute',
						bottom: 30,
						left: 10
					}}
					underlayColor={Colours.cTransparent}>
					<Text style={buttonStyles.text}>Back</Text>
				</Button>
			</View>
		);
	}

	renderSuccessView =() => {
		const { textStyle, initStyle, flexCenter, inputField, containerStyle, backgroundStyle, formStyle, successText } = styles;
		const { success } = this.props.copy;
		return(
			<View
				style={[ initStyle, containerStyle]}
			>
			<Image
				style={backgroundStyle}
				source={background}
			/>
				<View style={formStyle}>
					<Text style={[successText, {paddingTop: 30, paddingBottom: 30}]}>{success.heading}</Text>
					<Text style={[textStyle, { paddingBottom: 40}]}>{success.body}</Text>
					<Button 
						style={[buttonStyles.button]} 
						action={() => this.dismiss()}
						underlayColor={Colours.cPrimaryUnderlay}
					>
						<Text style={buttonStyles.text}>{success.button}</Text>
					</Button>
				</View>	
			</View>
		)
	}

	render() {
		try {
			const { initStyle, backgroundStyle } = styles;
			const resizeMode = 'cover';
			const { success } = this.state;
			return (
				<View style={ [initStyle, {
					justifyContent: 'center'
				}] }>
					{success ? this.renderSuccessView() : this.renderForm()}
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

const baseButton = {
	padding: 12,
	paddingLeft: 18,
	paddingRight: 18,
	height: 40,
	// width: '100%',
	minWidth: 180,
	alignItems: 'center',
	margin: 20,
	justifyContent: 'center'
}

const buttonStyles = {
	smallButton: {
		padding: 12,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 30,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colours.cPrimary
	},
    button: {
		...baseButton,
		backgroundColor: Colours.cPrimary,
	},
	error: {
		...baseButton,
		backgroundColor: Colours.cNearlyBlack,
	},
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    }
}

const styles = {
	errorText: {
		position: 'absolute',
		bottom: -10,
		width: '100%'
	},
	successText: {
		...Fonts.fHeadingMedium,
		color: Colours.cWhite,
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	formStyle: {
		paddingTop: 20,
		marginLeft: 20,
		marginRight: 20,
		backgroundColor: Colours.cOffBlack,
	},
	backgroundStyle: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		flex: 1,
		resizeMode:'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	containerStyle: {
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	textStyle: {
		fontSize: 25,
		...Fonts.fBodyText,
		color: Colours.cWhite,
		textAlign: 'center',
		backgroundColor: 'transparent'
	},
	initStyle: {
		flex: 1,
		backgroundColor: Colours.cOffBlack
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputField: {
		marginBottom: 20
	}
};

export default ForgetPassWordView;
