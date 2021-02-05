import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';
import Typography from '../../styles/typography';

export default LayoutBorder = (props) => {

	const { mainBorder, center } = styles;

	return (
		<View style={[mainBorder, (props.center) ? center : {}]}>
			{props.children}
		</View>
	);
};

const styles = {
	mainBorder: {
		flex: 1,
		padding: 10,
		marginTop: 8,
		marginBottom: 12,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 15,
		backgroundColor: '#FFF',
		shadowColor: Oxygen.darkBlue,
		shadowOpacity: 1,
		shadowRadius: 6,
		shadowOffset: {width: 0, height: 2}
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};
