import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import classnames from 'classnames';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Styles from './SwiperContainer.styles';
import Fonts from 'app/styles/Fonts';
import Layout from 'app/styles/Layout';
const { p20, mb20 } = Layout;
import Dimensions from 'Dimensions';

/* user imports */
import Colours from 'app/styles/Colours';
import ItemPromo from 'app/components/common/ItemPromo';
import ItemOffer from 'app/components/common/ItemOffer';
import SwiperDot from 'app/components/common/SwiperDot';
import Button from 'app/components/common/Button';
import Card from 'app/components/common/Card';

class SwiperContainer extends Component {

	state = { 
		itemStyle: Styles.item,
		selectedIndex: 0,
		visibleSwiper: false
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				visibleSwiper: true
			});
		}, 100);
	}

	renderItems(items) {
		
		const { navigation, updateButton, promo, loyaltycard, signup, firstName, lastName, offer, copy, onboarding } = this.props;
		const { flexCenter, cardItem, onboardItem, onboardItemSmall, onboardHeading, onboardingText, signupItem, signupItemSmall } = Styles;
		const display = items.filter((el, i) => {
			if (i < 5) return el;
		});
		const width = Dimensions.get('window').width;

		const name = firstName && lastName ?
			`${firstName} ${lastName}` :
			'Customer';

		if (offer) {
			if (display.length > 0) {
				return display.map((item, index) => {
					return (
						<ItemOffer
							item={item}
							updateButton={updateButton}
							navigation={navigation}
							key={index} 
							alt={this.props.alt ? true : false}
							swiperContainer={true}
							/>
					);
				});
			} else {
				return (
					<View style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<Button
							underlayColor={Colours.cPrimaryUnderlay}
							style={{
								marginBottom: 20
							}}
							action={() => {
								this.props.updateSelectedIndex(0);
								this.props.navigation.navigate('Offers');
							}}
						>
							<Text style={{
								...Fonts.fHeadingMedium,
								color: Colours.cWhite,
								backgroundColor: Colours.cPrimary,
								padding: 10,
								minWidth: '70%',
								textAlign: 'center'
							}}>View active offers</Text>
						</Button>
						<Button
							underlayColor={Colours.cPrimaryUnderlay}
							action={() => {
								this.props.updateSelectedIndex(1);
								this.props.navigation.navigate('Offers');
							}}
						>
							<Text style={{
								...Fonts.fHeadingMedium,
								color: Colours.cWhite,
								backgroundColor: Colours.cPrimary,
								padding: 10,
								minWidth: '70%',
								textAlign: 'center'
							}}>View expired offers</Text>
						</Button>
					</View>
				);
			}
		}

		if (promo) {
			return items.map((item, index) => {
				return (
					<ItemPromo
						item={item}
						updateButton={updateButton}
						navigation={navigation}
						key={item.key} 
						alt={this.props.alt ? true : false}
						swiperContainer={true}
						/>
				);
			});
		}

		if (onboarding) {
			if (width > 370) {
				return display.map((item, index) => {
					return (
						<View style={onboardItem} key={index}>
							<Image 
								style={{
									width: 220, 
									height: 220, 
									marginBottom: 40
								}} 
								source={{uri: 'https://via.placeholder.com/220x220'}} 
							/>
							<Text style={onboardHeading}>{item.heading}</Text>
							<Text style={onboardingText}>{item.body}</Text>
						</View>
					);
				});
			} else {
				return display.map((item, index) => {
					return (
						<View style={onboardItemSmall} key={index}>
							<Image 
								style={{
									width: 200, 
									height: 200, 
									marginBottom: 30
								}} 
								source={{uri: 'https://via.placeholder.com/200x200'}} 
							/>
							<Text style={onboardHeading}>{item.heading}</Text>
							<Text style={onboardingText}>{item.body}</Text>
						</View>
					);
				});
			}
		}
		
		if (loyaltycard) {
			return display.map((item, index) => {
				return (
					<View style={[flexCenter, cardItem]} key={item.key}>
						<Card name={name} />
					</View>
				);
			});
		}

		if (signup) {
			if (width > 370) {
				return items.map((item, index) => {
					return (
						<View style={signupItem} key={index}>
								<Image style={{width: 220, height: 220}} source={{uri: item.image}} />
								<Text style={{
									...Fonts.fHeadingMedium,
									marginVertical: 20
								}}>{item.heading}</Text>
								<Text style={{
									...Fonts.fInputFieldText,
									textAlign: 'center'
								}}>{item.body}</Text>
						</View>
					);
				});
			} else {
				return items.map((item, index) => {
					return (
						<View style={signupItemSmall} key={index}>
								<Image style={{width: 200, height: 200}} source={{uri: item.image}} />
								<Text style={{
									...Fonts.fHeadingMedium,
									marginVertical: 20
								}}>{item.heading}</Text>
								<Text style={{
									...Fonts.fInputFieldText,
									textAlign: 'center'
								}}>{item.body}</Text>
						</View>
					);
				});
			}
		}

		return (
			<View><Text>Error - no item type found</Text></View>
		);
	}

	renderIndexing(items) {
		const {dotsAlt} = this.props; 
		return items.map((item, index) => {
			if (index > 4) return;
			if (index === this.state.selectedIndex) {
				return (
					<SwiperDot 
						alt={dotsAlt}
						key={index} 
						active={true} />
				);
			} else {
				return (
					<SwiperDot 
						alt={dotsAlt}
						key={index} />
				);
			}
		});
	}

	onIndexChanged(index) {
		this.setState({
			...this.state,
			selectedIndex: index,
		});
	}
	
	render() {
		const classes = classnames('delete', {
			'is-small': this.props.alt,
		});

		try {
			const { 
				textStyle,
				linkStyle,
				container, 
				flexCenter, 
				swiperContainer, 
				swiperStyle, 
				containerAlt, 
				header,
				headerUnderline,
				loyaltyHeading,
				swiperDots,
				signupStyles,
				signupStylesSmall,
				signupDots,
				onboardingStyles,
				onboardingStylesSmall,
				containerAltWhite,
				onboardingSwiper,
				onboardDots
			} = Styles;
			const width = Dimensions.get('window').width;
			const { title, navigationAction, signup, alt, slides, onboarding, promo, offer, loyaltycard } = this.props;
			const containerStyle = alt ? containerAlt : null;
			const containerPromoStyle = alt && promo ? containerAltWhite : null;
			const headerUnderlineStyle = promo || offer ? headerUnderline : header;
			const loyaltyHeadingStyle = loyaltycard ? loyaltyHeading : textStyle;
			let swiperDimensions;
			let signupComponentStyle;
			let onboardingComponentStyle;
			let smallScreenDots;

			if (signup) {
				if (width > 370) {
					signupComponentStyle = signupStyles;
				} else {
					signupComponentStyle = signupStylesSmall;
					smallScreenDots = signupDots;
				}
			} else {
				signupComponentStyle = null;
			}

			if (onboarding) {
				if (width > 370) {
					onboardingComponentStyle = onboardingStyles;
				} else {
					onboardingComponentStyle = onboardingStylesSmall;
					smallScreenDots = onboardDots;
				}
			} else {
				onboardingComponentStyle = null;
			}

			// TODO (@dennis)
			// I think items for the Swiper container should be added as properties on the view instantiation - 
			// not via the reducer. This allows any component that wants to load a SwiperContainer to dictate the slides. 
			// I am hesitatant to touch the mapStateToProps() fn so I've just added 'slides' instead of 'items' on the 
			// SignUp SwiperContainer view. We should address this.
	
			return (
				<View style={ [flexCenter, container, containerStyle, containerPromoStyle, signupComponentStyle, onboardingComponentStyle] }>
					<View style={header, headerUnderlineStyle}>
						<Text style={textStyle, loyaltyHeadingStyle}>{title ? title : null}</Text>
						{navigationAction && 
							<Button
								underlayColor='rgba(0,0,0,0)'
								action={navigationAction}
							>
								<Text style={linkStyle}>{loyaltycard ? 'ADD A CARD' : 'VIEW ALL >'}</Text>
							</Button>
						}
					</View>
					{this.state.visibleSwiper ?
						<Swiper
							loop={false}
							showsPagination={false}
							style={swiperStyle}
							removeClippedSubviews={false}
							ref={this.props.ref}
							onIndexChanged={(index) => this.onIndexChanged(index)}
							containerStyle={{width: '100%', height: '100%'}}
						>
							{this.renderItems(slides ? slides : this.props.items)}
						</Swiper>
					: null}
					<View style={[swiperDots, smallScreenDots]}>
						{this.renderIndexing(slides ? slides : this.props.items)}
					</View>
				</View>
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

export default SwiperContainer;
