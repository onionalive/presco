import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import surf from 'app/img/surf.jpg';
import Fonts from 'app/styles/Fonts';
import { connect } from 'react-redux';
import { updateSelectedItem } from 'app/components/offers/OffersReducer';

const mapStateToProps = (state) => {
	return {};
};
class ItemOffer extends Component {
	/**
	 * Action the selected item to define
	 * what shows up on the modal.
	 * @param {*} item 
	 */
	handlePress(item) {
		this.props.updateSelectedItem({
			...item,
			// needs to update
			image: 'https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2',
			type: 'offer'
		});
		this.props.navigation.navigate('ModalNav');
	}

	/**
	 * Render an image as a cover photo
	 * @param {*} source 
	 */
	renderImage(source) {
		const resizeMode = 'cover';
		
		try {
			return (
				<Image
					style={{
						backgroundColor: Colours.cTransparent,
						flex: 1,
						resizeMode,
						position: 'absolute',
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						borderRadius: 14
					}}
					source={source}
				/>
			)
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	render() {
		const { 
			swiperItemStyle, 
			container, 
			containerAlt, 
			listContainer,
			listItemStyle,
			notch,
			notchLeft,
			notchRight,
			notchHome,
			notchList
		} = styles;
		const { item, alt, swiperContainer, list } = this.props;

		let containerStyle, itemStyle;
		if (swiperContainer) {
			containerStyle = alt ? containerAlt : container;
			itemStyle = swiperItemStyle;
		} else {
			containerStyle = listContainer;
			itemStyle = listItemStyle;
		}

		const notchColour = list ?
			notchList :
			notchHome;

		return (
			<View style={containerStyle}>
				<TouchableHighlight
					onPress={ () => this.handlePress(item) }
					style={itemStyle}
					activeOpacity={0.5}
					underlayColor='rgba(0,0,0,0)'
					>
					<View style={{ 
                        flex: 1,
						position: 'relative',
						borderRadius: 14 
                    }}>
                        {this.renderImage({uri: 'https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2'})}
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 76,
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: Colours.cOffBlack,
							borderRadius: 14,
							borderTopWidth: 1,
							borderTopColor: Colours.cWhite
                        }}>
                            <Text style={{
                                backgroundColor: 'rgba(0,0,0,0)',
                                color: Colours.cWhite,
                                alignSelf: 'center',
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                ...Fonts.fHeadingMedium
                            }}>{item.voucherDescription}</Text>{/* this needs to change to voucherDescription */}
                        </View>
                        <View style={[notch, notchLeft, notchColour]}></View>
                        <View style={[notch, notchRight, notchColour]}></View>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = {
	swiperItemStyle: {
		height: 220,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
        backgroundColor: Colours.cBlack,
        borderRadius: 14,
        overflow: 'hidden'
	},
	container: {
		backgroundColor: Colours.cWhite, 
        height: 300
	},
	containerAlt: {
		backgroundColor: Colours.cOffWhite, 
		height: 300
	},
	listContainer: {
		backgroundColor: Colours.cWhite
	},
	listItemStyle: {
		height: 180,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 20,
        backgroundColor: Colours.cBlack,
        borderRadius: 14
    },
    notch: {
        position: 'absolute',
        borderRadius: 100,
        width: 20,
        height: 20,
        bottom: 67,
        zIndex: 20
	},
	notchHome: {
		backgroundColor: Colours.cOffWhite,
	},
	notchList: {
		backgroundColor: Colours.cWhite,
	},
    notchLeft: {
        left: -10
    },
    notchRight: {
        right: -10
    }
};

export default connect(mapStateToProps, {
	updateSelectedItem
})(ItemOffer);
