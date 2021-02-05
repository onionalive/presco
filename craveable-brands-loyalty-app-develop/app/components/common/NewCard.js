import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
// import QRCode from 'react-native-qrcode-svg';
import Images from 'app/img/Image';
import Button from 'app/components/common/Button';

/* user imports */

class NewCard extends Component {
	
	formateMemberIdentifier = (card) => {
		if (!card.memberIdentifierType || card.memberIdentifierType.value !== 'Card ISO') {
			return card.memberIdentifier;
		}
		return card.memberIdentifier.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
	}

	onPress = (memberIdentifier) => {
		Alert.alert(
		  'Delete Card!!!',
		  'Are you sure?',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: 'OK', onPress: () => this.props.action(memberIdentifier)},
		  ],
		  { cancelable: false }
		)
	}

	renderEmptyCard = () => {
		const { action } = this.props;
		const { 
			emptyContainer,
			plusIcon, 
			cardContainer
		} = styles;
		return(
			<View style={[cardContainer, emptyContainer]} accessible={false}>
				<TouchableOpacity onPress={() => action()}>
					<Image source={Images.plus} style={plusIcon}/>
				</TouchableOpacity>	
			</View>
		)
	}

	renderCard = () => {
		const { card, editable, popNotification } = this.props;
		const {
			cardContainer, 
			cardText,
			cardDigits,
			iconStyle,
			date,
			closeIcon,
			editbleStyle,
			closeIconContainer,
			container
		} = styles;
		const issued_date = card.creationDate ? moment(card.creationDate).format("DD/MM/YYYY") : '';
		const card_num = card.memberIdentifier ? this.formateMemberIdentifier(card) : '';
		const containerStyle = editable ? [cardContainer, editbleStyle] : cardContainer;

		return (
			<View style={container}>
				{editable && <TouchableOpacity style={closeIconContainer} onPress={() => popNotification(card.memberIdentifier)}>
							<Image source={Images.deleteCard} style={closeIcon}/>
						</TouchableOpacity>}
				<View style={containerStyle} accessible={false}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
							<Image source={Images.logo} style={iconStyle}/>	
					</View>
					<View>
						<Text style={cardDigits}>{card_num}</Text>
						<Text style={cardText}>Date issued:   <Text style={[cardText, date]}>{ issued_date } </Text></Text>
					</View>
				</View>
			</View>
		);
	}

	render() {
		const { empty } = this.props;
		if(empty){
			return this.renderEmptyCard();
		} else {
			return this.renderCard();
		}
	}
}

const styles = {
	container: {
		flexDirection: 'column',
		justifyContent:'center',
		alignItems: 'flex-end'
	},
	plusIcon: {
		width: 40,
		height: 40
	},
	closeIconContainer: {
		marginBottom: -13,
	 	marginRight: -10,
	 	zIndex: 10
	},
	editbleStyle: {
		borderWidth: 3,
		borderColor: Colours.cRed
	},
	closeIcon: {
		width: 25,
		height: 25
	},
	iconStyle: {
		height: 25,
		width: 100
	},
	textStyle: {
		fontSize: 20
	},
	lowerTextContainer: {
		marginBottom: 20,
		flexDirection: 'row'
	},
	upperCardContainer: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardContainer: {
		zIndex: -1,
		flexDirection: 'column',
		backgroundColor: Colours.cOffBlack,
		width: 300,
		height: 170,
		borderRadius: 12,
		padding: 20,
		marginBottom: 20
	},
	cardDigits: {
		fontWeight: 'bold',
		marginTop: 35,
		color: Colours.cWhite,
		...Fonts.fUtility,
		fontSize: 18,
		marginBottom: 20
	},
	date: {
		fontWeight: '200',
	},
	cardText: {
		fontWeight: 'bold',
		color: Colours.cWhite,
		...Fonts.fUtility,
		fontSize: 14
	}
};

export default NewCard;
