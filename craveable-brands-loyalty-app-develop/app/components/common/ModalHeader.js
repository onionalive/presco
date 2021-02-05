import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Button from 'app/components/common/Button';
import Layout from 'app/styles/Layout';

class ModalHeader extends Component {
	render() {
		const { headingStyle, viewStyle, lowerHeading, subheadingStyle } = styles;
		const { mr5 } = Layout;
		const { title, img } = this.props;
		return (
			<View style={[viewStyle]}>
				<Text style={headingStyle}>{title}</Text>
				<Button 
					action={() => this.props.action()}
					accessibilityLabel={'Close modal'}>
					<Image source={img} style={styles.iconStyle}/>
				</Button>
			</View>		
		);
	}
};

/**
 * Styling for the Header
 */
const styles = {
	headingStyle: {
		fontSize: 20,
		color: Colours.cWhite,
		...Fonts.fHeadingMedium
	},
	iconStyle: {
		width: 20,
		height: 20
	},
	viewStyle: {
		flexDirection: 'row',
		backgroundColor: Colours.cOffBlack,
		height: 62,
		width: '100%',
		// marginTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		paddingBottom: 10,
		elevation: 2,
		zIndex: 10,
		justifyContent: 'space-between'
	},
	lowerHeading: {
		flexDirection: 'row'
	},
	subheadingStyle: {
		color: Colours.cOffWhite
	}
};

export default ModalHeader;
