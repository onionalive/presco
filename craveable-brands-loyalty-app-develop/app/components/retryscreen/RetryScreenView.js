import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, AsyncStorage, Platform, Image, TouchableHighlight, ActivityIndicator, NetInfo } from 'react-native';
import Fonts from 'app/styles/Fonts';
// import {Styles} from './Profile.styles';
import { Tranxactor } from 'app/common';
import SInfo from 'react-native-sensitive-info';
import Dimensions from 'Dimensions';
import Colours from 'app/styles/Colours';
import Images from 'app/img/Image';
const { background } = Images;
import QrCodeView from 'app/components/common/QrCodeView';
/* user imports */

class RetryScreenView extends Component {
	constructor (props) {
	    super(props)
	    this.state = {
	      error: '',
	      loading: false,
	      connectionError: ''
	    }
	 }

	retryLoad = async () => {
		try{
			await this.setState({ loading: true })
			console.log(this.props)
			const { navigation, updateProfile, setExpiration, goClearActions, goRefreshToken,loginSucess } = this.props;
			const token = await SInfo.getItem('token', {});
			const masterToken = await SInfo.getItem('masterToken', {});
			const userId = await AsyncStorage.getItem('userId');
			// console.log(token)
			console.log(masterToken)
			// console.log(userId)
			if(!token || !userId || !masterToken){
				goClearActions();
				return navigation.navigate('LoginNav');
			}
			const {status, ok, problem, data} = await goRefreshToken(masterToken);
			console.log(status)
			console.log(problem)
			if(status === 200){
				await AsyncStorage.setItem('retry', '');
				const result = await Tranxactor.asGetUserDetails(data.token, false);
				updateProfile(result.data);
				loginSucess();
				// return navigation.navigate('Main');
			} else if(status === 401 || status === 400 ){
				// console.log(problem);
				await AsyncStorage.setItem('retry', '');
				goClearActions();
				// return navigation.navigate('LoginNav');
			} else {
				console.log(problem);
				return this.setState({ error: 'not working, try later', loading: false})
			}
		} catch(err) {
		// 	console.log(err);
			await AsyncStorage.setItem('retry', '');
			goClearActions();
			// return navigation.navigate('LoginNav');
		}
	}


	async componentDidMount() {
		try{
			const connectionInfo = await NetInfo.getConnectionInfo();
			console.log(connectionInfo);
			if( connectionInfo.type === 'unknown' || connectionInfo.type === 'none') {
				this.setState({ connectionError: 'Internet connection Error. Please check your connection and try again' })
			} else {
				this.setState({ connectionError: 'Technical Error. Please try later!'})
			}
		} catch(error) {
			console.log(error);
			this.setState({ connectionError: 'Technical Error. Please try later!'})
		}
	}

	renderView = () => {
		const {
			qrContainer,
			buttomButtonContainer,
			infoContainer,
			errTextStyle,
			buttonText
		} = styles;
		const { error, connectionError } = this.state;
		// console.log(this.props.primaryCardID)
		return(
			<View>	
				<View style={qrContainer}>
					<QrCodeView
						value={this.props.primaryCardID}
						size={300}
					/>
				</View>
				<View style={infoContainer}>
					{!!connectionError && <Text style={buttonText}>{connectionError}</Text>}
					<TouchableHighlight onPress={() => this.retryLoad()} underlayColor='transparent' style={buttomButtonContainer}>
				        <View>
				          <Text style={buttonText}>RETRY</Text>
				        </View>
				     </TouchableHighlight>
					{!!error && <Text style={errTextStyle}>{error}</Text>}
				</View>
			</View>	

		)
	}

	renderActivityIndicator = () => {
		return(
			<ActivityIndicator
	          size='large'
	          style={{ marginTop: 150 }}
	        />
		)
	}

	render() {
		const {
			initStyle,
			flexCenter,
			backgroundImg,
		} = styles;
		const { error, loading } = this.state;
		let content = loading ? this.renderActivityIndicator() : this.renderView();
		return (
			<SafeAreaView style={initStyle}>
				<View style={flexCenter}>
					<Image
						style={backgroundImg}
						source={background}
					/>
					{content}
				</View>
			</SafeAreaView>
		);
	}
}

const styles = {
	qrContainer:{
		marginTop: 90,
	 	marginBottom: 20
	 },
	infoContainer: { 
		flexDirection: 'column',
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
    },
	backgroundImg: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center'
	},
	buttonText: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 12,
        textAlign: 'center'
    },
	buttomButtonContainer: {
    	backgroundColor: Colours.cPrimary,
        // position: 'absolute',
        marginTop: 30,
        width: '50%',
    	// bottom: 0,
  		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 50
  	},
	ButtonView: {
		backgroundColor: Colours.cPrimary,
		paddingVertical: 6,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: Colours.cPrimary,
		minWidth: 140,
		alignSelf: 'center'
	},
	Button: {
		color: Colours.cWhite,
		...Fonts.fHeadingSmall,
		fontSize: 12,
		textAlign: 'center'
	},
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: Colours.cBlack,
	},
	tabsContainerStyle: {
		borderColor: Colours.cWhite,
		borderWidth: 0
	},
	tabStyle: {
		backgroundColor: Colours.cWhite,
		borderWidth: 0,
		borderBottomColor: Colours.cLightGrey,
		borderBottomWidth: 1,
		minHeight: 40
	},
	errTextStyle: {
		marginTop: 10,
		...Fonts.fUtility,
		fontSize: 14,
		color: Colours.cRed,
	},
	activeTabStyle: {
		backgroundColor: Colours.cWhite,
		borderBottomColor: Colours.cPrimary,
		borderWidth: 0,
		borderBottomWidth: 1
	},
	activeTabTextStyle: {
		color: Colours.cBlack,
	}
};

export default RetryScreenView;
