import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, ScrollView, Image, Linking, SafeAreaView } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import ShowHideRow from 'app/components/common/ShowHideRow';
import styles from './LoyaltyStatus.styles';
import Layout from 'app/styles/Layout';
const { p20 } = Layout;
import Images from 'app/img/Image';

class LoyaltyStatus extends Component {

	renderTiers(tiers) {
		const { subheading, flexCenter, textStyle } = styles;
		const allTiers = Object.keys(tiers);

		return allTiers.map((tier, index) => {
			return (
				<View style={flexCenter, p20} key={tier}>
					<Text style={subheading}>{tier}</Text>
					<Text style={textStyle}>{tiers[tier].copy}</Text>
				</View>
			);
		});
	}

	render() {
		const { tiers } = this.props;
		const { 
			modalMargin,
			textStyle, 
			flexCenter,
			mainHeading,
			subheading,
			headerStyle
		} = styles;

		return (
			<SafeAreaView style={modalMargin}>
				<View style={headerStyle}>
					<Text style={ [mainHeading] }>Loyalty Status Tiers</Text>
					<Button
						action={() => this.props.navigation.goBack(null)}
						accessibilityLabel={'Close modal.'}
					>
						<Image source={Images.closeWhite} />
					</Button>
				</View>
				{ this.renderTiers(tiers) }
			</SafeAreaView>
		);
	}
}

export default LoyaltyStatus;
