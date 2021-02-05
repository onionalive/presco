import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';
import surf from 'app/img/surf.jpg';
import Fonts from 'app/styles/Fonts';
import { connect } from 'react-redux';
import { updateSelectedItem } from 'app/components/offers/OffersReducer';
import ImageProxy from 'app/common/ImageProxy';

const mapStateToProps = (state) => {
	return {};
};

const imageProxy = new ImageProxy();

class ItemPromo extends Component {
	/**
	 * Action the selected item to define
	 * what shows up on the modal.
	 * @param {*} item 
	 */
	handlePress(item) {
		this.props.updateSelectedItem({
			...item,
			type: 'promo'
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
						backgroundColor: Colours.cBlack,
						flex: 1,
						resizeMode,
						position: 'absolute',
						width: '100%',
						height: '100%',
						justifyContent: 'center'
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
			listItemStyle 
		} = styles;
		const { item, alt, swiperContainer } = this.props;

		let containerStyle, itemStyle;
		if (swiperContainer) {
			containerStyle = container;
			itemStyle = swiperItemStyle;
		} else {
			containerStyle = listContainer;
			itemStyle = listItemStyle;
		}

		const image = imageProxy.get(item.image, 1, 1.78);

		return (
			<View style={containerStyle}>
				<TouchableHighlight
					onPress={ () => this.handlePress(item) }
					style={itemStyle}
					activeOpacity={0.5}
					underlayColor='rgba(0,0,0,1)'
					>
					<View style={{flex: 1}}>
						{this.renderImage({uri: image})}
						<View style={{
			          position: 'absolute',
			          bottom: 0,
			          height: 76,
			          width: '100%',
			          alignItems: 'center',
			          backgroundColor: Colours.cOffBlack,
			      }}>
							<Text style={{
								backgroundColor: 'rgba(0,0,0,0)',
								color: Colours.cWhite,
								alignSelf: 'center',
								marginTop: 'auto',
								marginBottom: 'auto',
								paddingHorizontal: 40,
								...Fonts.fHeadingMedium,
								letterSpacing: 0.2,
								textAlign: 'center'
							}}>{item.title}</Text>
						</View>
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
		backgroundColor: Colours.cBlack
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
		backgroundColor: Colours.cBlack
	}
};

export default connect(mapStateToProps, {
	updateSelectedItem
})(ItemPromo);
