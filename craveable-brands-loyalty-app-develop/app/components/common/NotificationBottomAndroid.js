import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Animated, Easing, Image } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import Button from './Button';
import Dimensions from 'Dimensions';
import Fonts from 'app/styles/Fonts';
import Emoji from 'node-emoji';
import Images from 'app/img/Image';
const { closeWhite, alertWhite } = Images;
import * as Animatable from 'react-native-animatable';

/**
 * TODO: Update notif type names to make more sense
 */
class Notification extends Component {

	state = {
		offset: new Animated.ValueXY(),
		open: false,
		height: Dimensions.get('window').height,
		mounted: false
	};

	componentWillReceiveProps(props) {
		if (props.showNotification) {
			this.open();
		}
	}

	open = () => {
		const { offset } = this.state;

		Animated.spring(       // Animate over time
			offset,            // The animated value to drive
			{
				toValue: { x:0, y: 0 },                   // Animate to opacity: 1 (opaque)
				//duration: 270,              // Make it take a while
			}
		).start();

		if (this.refs.notificationBottom) {
			this.refs.notificationBottom.transitionTo({
				height: Dimensions.get('window').height,
                minHeight: Dimensions.get('window').height,
                opacity: 1
			});
		}
	}

	closeNotification = () => {
		const { offset } = this.state;

		// console.log('## offset', offset.y);
		Animated.spring(    // Animate over time
			offset,         // The animated value to drive
			{
				toValue: { x:0, y: 333 },                   // Animate to opacity: 1 (opaque)
				//duration: 270,              // Make it take a while
			}
		).start();

        this.props.setNotificationFalse();
        this.props.updateShowNotificationBottom(false);

		if (this.refs.notificationBottom) {
			this.refs.notificationBottom.transitionTo({
				height: 0,
                minHeight: 0,
                opacity: 0
			});
		}
	}

	renderErrorNotification() {
		return (
			<View style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start'
			}}>
				<Image source={alertWhite} />
				<Text style={{
					...Fonts.fUtilityBold,
					fontSize: 14,
					lineHeight: 20,
					color: Colours.cWhite,
					textAlign: 'center'
				}}>SORRY</Text>
				<Text style={{
					...Fonts.fUtility,
					lineHeight: 16.8,
					letterSpacing: 0.1,
					color: Colours.cOffWhite,
					textAlign: 'center'
				}}>The app is unavaible due to scheduled maintenance. We will be back up and running at 6am.</Text>
			</View>
		)
	}

	renderNotification() {
		const { title, subtitle, footer, view } = this.props.notificationTextBottom;

		if (view === 'ONE') {
			return (
						<View style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'flex-start',
									paddingHorizontal: 20
								}}>
							<Text style={{
								...Fonts.fHeadingMedium,
								textAlign: 'center',
								color: Colours.cWhite,
								marginBottom: 10
							}}>{Emoji.emojify(title)}</Text>
							<Text style={{
								...Fonts.fBodyText,
								lineHeight: 22.4,
								textAlign: 'center',
								color: Colours.cWhite,
								marginBottom: 20
							}}>{subtitle}</Text>
							<Button style={{marginTop: 20}}>
								<Text style={{
									...Fonts.fUtility,
									color: Colours.cWhite,
									textDecorationLine: 'underline'
								}}>{footer}</Text>
							</Button>
						</View>
			);
		}

		if (view === 'TWO') {
				return (
					<View style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
						paddingHorizontal: 40
					}}>
						<Image style={styles.alertIcon} source={alertWhite} />
						<Text style={{
							...Fonts.fUtilityBold,
							fontSize: 14,
							lineHeight: 20,
							color: Colours.cWhite,
							textAlign: 'center',
							marginVertical: 10
						}}>{title}</Text>
						<Text style={{
							...Fonts.fUtility,
							lineHeight: 16.8,
							letterSpacing: 0.1,
							color: Colours.cOffWhite,
							textAlign: 'center'
						}}>{subtitle}</Text>
					</View>
				);
		}
	}

	componentDidMount() {
		this.closeNotification();
		
		setTimeout(() => {
			this.setState({
				mounted: true
			})
		}, 500);
	}

	renderButtons = (buttons) => {
		const bt = buttons.map((d, i) => {
			return (	
				<Button key={i} action={ d.action ? () => { 
						d.action();
						this.closeNotification();
				 } : this.closeNotification} style={{
					flex: 1,
					height: 46,
					padding: 12,
					marginBottom: 20,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: buttons.length < 2 ? Colours.cPrimary : i === 0 ? Colours.cOffBlack : Colours.cPrimary 
				}}>
					<Text style={buttonStyles.text}>{d.title}</Text>
				</Button>
			)
		});
		return (
			<View style={{ flex: 1, flexDirection: 'row', width: '100%', position: 'absolute', bottom: 0 }}>
				{bt}
			</View>
		)
	};

	render() {
		const {
			buttons 
		} = this.props.notificationTextBottom;
		const { offset, mounted } = this.state;
		const { notification } = styles;
		const height = Dimensions.get('window').height;
		// const width = Dimensions.get('window').width;

		// const mountedStyle = mounted ?
		// 	{ top: width < height ? height -350 : width - 350 } :
		// 	null;

		try {
			return (
				<Animatable.View
					ref="notificationBottom"
					style={[
						{
							zIndex: 100,
							height: height,
							minHeight: height,
							position: 'absolute',
							width: '100%'
						}
					]}
				>
					<Animated.View
						style={[offset.getLayout(),
							{
								zIndex: 100,
								minHeight: height,
								position: 'absolute',
								width: '100%'
							}
						]}>
						<View style={[notification]}>
							<View style={{
								flexDirection: 'row',
								justifyContent: 'flex-end',
								paddingHorizontal: 20,
								marginBottom: 30,
							}}>
								<Button style={{alignSelf: 'flex-end'}} action={() => this.closeNotification()}>
									<Image source={closeWhite} />
								</Button>
							</View>
							{ this.renderNotification() }
							{ this.renderButtons(buttons) }
						</View>
					</Animated.View>
				</Animatable.View>
			);
		} catch(err) {
			console.log(err);
		}
	}
}

const buttonStyles = {
    button: {
        backgroundColor: Colours.cPrimary,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%', 
        borderRadius: 0, 
        position: 'absolute', 
        bottom: 0,
        height: 46
    },
    doubleButton: {
    	backgroundColor: Colours.cBlack,
    	width: '50%',
    	left: 0
    },
    doubleButtonTwo: {
    	backgroundColor: Colours.cPrimary,
    	width: '50%',
    	left: '50%'
    },
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14,
        textAlign: 'center'
    }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = {
	alertIcon: {
		width: 30,
		height: 30,
		marginBottom: 20
	},
	textStyle: {
		fontSize: 20
	},
	notification: {
		backgroundColor: 'rgba(22,22,22,1)',
		height: 350,
		width: '100%',
		position: 'absolute',
		top: width < height ? height -350 : width - 350,
		left: 0,
		right: 0,
		paddingTop: 20,
		paddingBottom: 0
	}
};

export default Notification;
