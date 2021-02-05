import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import ShowHideRow from 'app/components/common/ShowHideRow';
import styles from './Help.styles';
import orderBy from 'lodash/orderBy';

class Help extends Component {

	renderFAQ = (faqs) => {
		const { 
			flexCenter,
			buttonText,
			buttonContainerView,
			headingContainer,
			que,
			ans
		} = styles;
		
		return faqs.map((faq, index) => {
			const { question, answer } = faq;
			if(!question) {
				return null;
			}
			return (
				<ShowHideRow
					faq={faq}
					key={index}
					styles={styles}
				 />
			);
		});
	}

	render() {
		const { faqs, navigation, copy, heading } = this.props;
		const { 
			textStyle, 
			initStyle, 
			flexCenter,
			buttonText,
			mainHeading,
			subheading,
			buttonContainerView,
			headingContainer,
			row,
			button
		} = styles;
		const ordered_faqs = orderBy(faqs, 'order', ['asc'])
		return (
			<ScrollView 
				style={initStyle}
				contentContainerStyle={flexCenter}
			>
				<View style={headingContainer}>
					<Text style={ [mainHeading] }>{heading}</Text>
					<Text style={ [subheading] }>{copy}</Text>
				</View>
				{ this.renderFAQ(ordered_faqs) }
				<View style={headingContainer}>
					 <Button 
					 	action={()=> navigation.goBack()}
					 	style={button}
					 >
			            <Text>Back</Text>
			        </Button>
				</View>
			</ScrollView>
		);
	}
}

export default Help;
