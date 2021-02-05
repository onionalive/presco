import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Images from 'app/img/Image';

/* user imports */
const NAV = 'nav';

class More extends Component {
	/**
	 * Set a specific action for each menu item type.
	 * @param {*} cta What action to take within the specific field
	 */
	action(cta) {
		const { navigation } = this.props;

		// Check if the action is a URL
		if(cta.substring(0, 4) == "http") {
			return () => Linking.openURL(cta).catch(err => console.log('An error occurred', err));
		// } else if (cta === 'Help') {
		// 	return () => navigation.navigate(cta);
		} else {
			return () => navigation.navigate(cta);
		}
	}

	/**
	 * Map an array of the options out to build
	 * the view.
	 * @param {*} options Array of the option fields.
	 */
	renderOptions(options) {
		const { 
			flexCenter,
			buttonText,
			buttonContainerView,
			headingContainer,
			row
		} = styles;

		
		return options.map((option, index) => {
			const { cta, title } = option;
			const action = this.action(cta);

			return (
				<View key={index} style={buttonContainerView} >
					<Button key={index}
						action={action}
						accessibilityLabel={title}
					>
						<View style={row}>
							<Text style={[buttonText]}>{title}</Text>
							<Image style={{height: 10}} source={Images.chevronRightWhite} />
						</View>
					</Button>
				</View>	
			);
		});
	}

	render() {
		const { options, firstName, loyaltyBalance } = this.props;
		const { 
			textStyle, 
			initStyle, 
			flexCenter,
			buttonText,
			mainHeading,
			subheading,
			buttonContainerView,
			headingContainer,
			row
		} = styles;


		const sortedOptions = Object.keys(options).sort(function(a,b) {
			return options[a].order >= options[b].order;
		}).map(function(sortedKey) {
			return options[sortedKey];
		});

		return (
			<View style={[initStyle, flexCenter]}>
				<View style={headingContainer}>
					<Text style={ [mainHeading] }>{firstName}</Text>
					<Text style={ [subheading] }>{`$${(Math.floor(100 * Number(loyaltyBalance)) / 100).toFixed(2)}`}</Text>
				</View>
				{ this.renderOptions(sortedOptions) }	
			</View>
		);
	}
}

// <TouchableOpacity
// 	onPress={ () => this.props.screenProps.goTo('TabOneScreenTwo') }
// 	style={{
// 		padding:20,
// 		borderRadius:20,
// 		backgroundColor:'yellow',
// 		marginTop:20
// 	}}>
// 	<Text>{'Go to next screen this tab'}</Text>
// </TouchableOpacity>
//
const styles = {
	mainHeading: {
		...Fonts.fHeadingMedium,
		color: Colours.cWhite,
		marginBottom: 10
	},
	subheading: {
		...Fonts.fUtility,
		color: Colours.cWhite
	},
	headingContainer: {
		marginBottom: 40,
		alignItems: 'center'
	},
	buttonText: {
		color: Colours.cWhite,
		...Fonts.fUtility
	},
	initStyle: {
		backgroundColor: Colours.cOffBlack,
		padding: 20,
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center'
	},
	buttonContainerView: {
		paddingBottom: 4,
		marginBottom: 20,
		borderBottomWidth: 0.5,
		borderBottomColor: Colours.cGrey
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

export default More;
