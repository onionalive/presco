import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, Linking, ScrollView } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import { Styles } from './styles';
import moment from 'moment';
/* user imports */
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import ImageProxy from 'app/common/ImageProxy';
import Images from 'app/img/Image';

const mapStateToProps = (state) => {
    return {
        selectedItem: state.OffersReducer.selectedItem
    }
}

const imageProxy = new ImageProxy();

class ModalPromo extends Component {
	/**
	 * Render the image as a cover background
	 * for the view
	 * @param {*} source Image URI/file
	 */
	renderImage(source) {
		const { imageStyle } = Styles;
		try {
			return (
				<Image
					style={imageStyle}
					source={{uri: source}}
				/>
			)
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	renderOffer() {
		const { startDate, endDate } = this.props.selectedItem;
		const { 
			backgroundOffWhite, 
			paddingStyle,
			bodyTextStyle,
			borderStyle,
			rowWrapperStyle,
			boldText,
			utilityTextStyle
		} = Styles;

		return (
			<View style={[backgroundOffWhite, paddingStyle]}>
				<Text style={bodyTextStyle}>Offer available</Text>
				<View style={borderStyle}></View>
				<View style={rowWrapperStyle}>
					<View style={{
						width: '50%'
					}}>
						<Text style={boldText}>From</Text>
						<Text style={utilityTextStyle}>{ moment(startDate).format('MMMM Do, YYYY') }</Text>
					</View>
					<View style={{
						width: '50%'
					}}>
						<Text style={boldText}>Until</Text>

						<Text style={utilityTextStyle}>{ moment(endDate).format('MMMM Do, YYYY') }</Text>
					</View>
				</View>
			</View>
		)
	}

	renderPromo() {
		const { terms_copy, type } = this.props.selectedItem;
		const {
			backgroundOffBlack,
			paddingStyle,
			termsText,
			termsHeading
		} = Styles;
		const termsObject = (
			<View style={[backgroundOffBlack, paddingStyle]}>
				<Text style={[termsText, termsHeading]}>Terms and Conditions</Text>
				<Text style={termsText}>{terms_copy}</Text>
			</View>
		)

		if (terms_copy !== undefined) {
			return termsObject;
		} else {
			return null;
		}
	}

	render() {
			console.log('MODAL PROPS', this.props);
			const { title, body, voucherDescription, date_from, date_to, terms, type } = this.props.selectedItem;
			const { 
				textStyle, 
				initStyle, 
				flexCenter,
				headingStyle,
				headingTextStyle,
				headerStyle,
				promoHeaderStyle,
				promoHeadingStyle,
				promoHeadingTextStyle,
				modalMargin,
				backgroundWhite,
				backgroundOffWhite,
				bodyTextStyle,
				utilityTextStyle,
				centreText,
				boldText,
				paddingStyle,
				borderStyle,
			} = Styles;



		try {
			/**
			 * This will likely need to be changed for offers
			 */
			console.log('CURRENT SELECTED', this.props.selectedItem);
			const image = this.props.selectedItem.image ?
				imageProxy.get(this.props.selectedItem.image, 1, 1.78) :
				'https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2';

			return (
				<ScrollView style={ modalMargin }>
					<View style={[headerStyle]}>
							{ this.renderImage(image) }
						<View style={[headingStyle]}>
							<Text style={[headingTextStyle, centreText]}>{type === 'offer' ? voucherDescription : title}</Text>
						</View>
						<View style={{
							position: 'absolute',
							right: 20,
							top: 44
						}}>
							<Button 
								action={() => this.props.navigation.goBack(null)} 
								accessibilityLabel={'Close modal'}
							>
								<Image source={Images.closeWhite} />
							</Button>
						</View>
					</View>
					{
						body && <View style={[backgroundWhite, paddingStyle]}>
							<Text style={[bodyTextStyle, centreText]}>{
								body !== undefined ?
									body.replace('\\n', `\n`) : body
								}</Text>
						</View>
					}
					{
						type === 'offer' ?
						this.renderOffer() :
						this.renderPromo()
					}
				</ScrollView>
			);
		} catch(err) {
			console.log(err);
			return (
				<View>
					<Text>Loading</Text>
				</View>
			);
		}
	}
}

export default connect(mapStateToProps)(ModalPromo);
