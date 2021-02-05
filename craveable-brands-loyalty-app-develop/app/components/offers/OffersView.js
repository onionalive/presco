import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Header from '../common/Header';
import ListView from '../common/ListView';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import {Styles} from './Offers.styles';

/* user imports */
import OffersActive from 'app/components/offersactive/OffersActive';
import OffersExpired from 'app/components/offersexpired/OffersExpired';

import SInfo from 'react-native-sensitive-info';

class Offers extends Component {
	state = {
		mounted: false
	}

	handleIndexChange = (index) => {
		this.props.updateSelectedIndex(index);
	}
	
	componentDidMount() {
		this.setState({ mounted: true });
	}

	/**
	 * Update state depending on the context
	 * of the current slide.
	 */

	// componentWillFocus() {
	// 	console.log('will focus');
	// }

	// componentWillReceiveProps() {
	// 	console.log('RECEIVED PROPS', this.state.count);
	// 	this.setState({
	// 		...this.state,
	// 		count: this.state.count++
	// 	})

	// 	try {
	// 		(async () => {
	// 			const { getOffersExpired, getOffersActive, id } = this.props;
	// 			const token = await SInfo.getItem('token', {});

	// 			getOffersExpired(id, token);
	// 			getOffersActive(id, token);
	// 		});
	// 	} catch(err) {
	// 		console.log('Loading offers error', err);
	// 	}
	// }

	render() {
		const {
			textStyle,
			initStyle,
			flexCenter,
			activeTabStyle,
			activeTabTextStyle,
			tabStyle,
			tabTextStyle,
			tabsContainerStyle
		} = styles;
		const { mounted } = this.state;
		const { navigation, firstName, loyaltyBalance, loyaltyStatus, selectedIndex } = this.props;

		console.log(mounted);
		
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Header action={() => navigation.navigate('ModalTransactionsNav')} 
					statusAction={() => navigation.navigate('LoyaltyStatusNav')}
					firstName={firstName} 
					loyaltyBalance={loyaltyBalance}
					loyaltyStatus={loyaltyStatus}
				/>
				<SegmentedControlTab
					values={['Active', 'Expired']}
					selectedIndex={selectedIndex}
					onTabPress={this.handleIndexChange}
					borderRadius={0}
					activeTabStyle={activeTabStyle}
					activeTabTextStyle={activeTabTextStyle}
					tabStyle={tabStyle}
					tabTextStyle={tabTextStyle}
					tabsContainerStyle={tabsContainerStyle}
					/>
				{
					selectedIndex === 0 ?
					<OffersActive navigation={navigation} mounted={mounted} /> :
					<OffersExpired  navigation={navigation} mounted={mounted} />
				}
			</SafeAreaView>
		);
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
	tabTextStyle: {
		color: Colours.cBlack,
	},
	activeTabStyle: {
		backgroundColor: Colours.cWhite,
		borderBottomColor: Colours.cPrimary,
		borderWidth: 0,
		borderBottomWidth: 1
	},
	tabTextStyle: {
		...Fonts.fUtility,
		fontSize: 14,
		color: Colours.cBlack,
	},
	activeTabTextStyle: {
		color: Colours.cBlack,
	}
};
export default Offers;
