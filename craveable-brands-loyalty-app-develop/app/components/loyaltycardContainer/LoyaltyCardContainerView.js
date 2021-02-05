import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import classnames from 'classnames';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Styles from './LoyaltyCardContainer.styles';
import Fonts from 'app/styles/Fonts';
import Layout from 'app/styles/Layout';
const { p20, mb20 } = Layout;
/* user imports */
import Colours from 'app/styles/Colours';
import SwiperDot from 'app/components/common/SwiperDot';
import Button from 'app/components/common/Button';
import NewCard from 'app/components/common/NewCard';
import SInfo from 'react-native-sensitive-info';
import data from './cards.json';

class LoyaltyCardContainerView extends Component {

	state = { 
		itemStyle: Styles.item,
		selectedIndex: 0,
		visibleSwiper: false 
	};

	popNotification = (memberIdentifier) => {
		const { openNotification, copy } = this.props;
		openNotification({
				title: copy.heading,
				subtitle: copy.body,
				buttonOne: 'CANCEL',
				buttonTwo: 'REMOVE CARD',
				footer: ' ',
				view: 'TWO',
				buttonTwoAction: () => this.removeCardAction(memberIdentifier) 
		});
	}

	renderItems(cards) {
		const { navigation, editable, openNotification, membershipCardId } = this.props;
		const { flexCenter, cardItem } = Styles;
		return cards.map((item, index) => {
			// console.log(item.memberIdentifier)
			return (
				<View style={[flexCenter, cardItem]} key={index}>
					<NewCard
						card={item}
						editable={editable && item.memberIdentifier !== membershipCardId}
						popNotification={this.popNotification}
					 />
				</View>
			);
		});
	}

	removeCardAction = async (identifierId) => {
		try {
			const token = await SInfo.getItem('token', {});
			const { memberId, removeCard, updateCardSuccess, updateCardFailure, getCardList} = this.props;
			if(token && memberId && identifierId){
				const {status, data} = await removeCard(memberId, identifierId, token);
				if(status == 200) {
					// console.log('Successfull marked card as cancelled!!')
					await getCardList();
					updateCardSuccess && updateCardSuccess();
				} else {
					if(data && data.errorMessage){
						console.log(data.errorMessage);
					}
					updateCardFailure && updateCardFailure();
				}
			} else {
				// console.log('Unable to delete cards!!!');
				updateCardFailure && updateCardFailure();
			}
		} catch (err) {
			console.log(err);
			updateCardFailure && updateCardFailure();
			return;
		}
	}

	addCartAction = async () => {
		console.log(this.props);
		this.props.navigation.navigate('ModalAddCardNav');
	}

	renderIndexing(cards) {
		const {dotsAlt} = this.props;
		return cards.map((item, index) => {
			if (index > 7) return;
			if (index == this.state.selectedIndex) {
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
		// console.log(index)
		this.setState({
			...this.state,
			selectedIndex: index,
		});
	}

	renderCards = (display_cards) => {
		const {
			swiperDots,
			swiperStyle,
			container,
		} = Styles;

		return(
			<View style={container}>
				{this.state.visibleSwiper && 
					<Swiper
						loop={false}
						showsPagination={false}
						style={swiperStyle}
						removeClippedSubviews={false}
						ref='LoyaltyCardContainer'
						onIndexChanged={(index) => this.onIndexChanged(index)}
						containerStyle={{width: '100%', height: '100%'}} 
					>
						{this.renderItems(display_cards)}
					</Swiper>
				}
				<View style={[swiperDots]}>
					{this.renderIndexing(display_cards)}
				</View>
			</View>
		)
	}

	renderEmphtCard = () => {
		return(
			<View style={{marginTop: 20}}>
				<NewCard
					empty
					action={this.addCartAction}
				/>
			</View>
		)
	}

	filterCards = (cards) => {
		return cards.filter((card, i) => {
					if (card.identifierStatus && card.identifierStatus.id == '1' 
						&& card.memberIdentifierType && card.memberIdentifierType.id == '1'
						) {
						return card;
					} 
			   });
		// return cards
	}

	componentDidMount() { 
		setTimeout(() => { 
			this.setState({ 
				visibleSwiper: true 
			}); 
		}, 10); 
	}
	
	render() {
		try {
			const {
				leftTextStyle,
				rightTextStyle,
				container, 
				header
			} = Styles;		
			const { navigationAction, cards } = this.props;
			// let display_cards = this.filterCards(cards);
			// // testing 
			// if(display_cards.length === 0) {
			// 	// display_cards = data;
			// }

			let cardContent;
			if(cards.length > 0) {
				cardContent =  this.renderCards(cards);
			}else{
				cardContent =  this.renderEmphtCard();
			}
			return(
				<View style={container}>
					<View style={header}>
						<Text style={leftTextStyle}>Linked cards</Text>
						<Button
								underlayColor='rgba(0,0,0,0)'
								action={() => {this.addCartAction()}}
							>
								<Text style={rightTextStyle}>Add a card</Text>
							</Button>
					</View>
					{cardContent}
				</View>
			)
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

export default LoyaltyCardContainerView;
