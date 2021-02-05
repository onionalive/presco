import React from 'react';
import { Text, View } from 'react-native';
import { Base, BucketOne } from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import Dimensions from 'Dimensions';
  
export default Cell = (props) => {

	const { textStyle, initStyle } = styles;
	const { flexCenter } = Layout;

	return (
		<View style={ [flexCenter, initStyle] }>
			{props.children}
		</View>
	);
};

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1,
		zIndex: 1,
		width: Dimensions.get('window').width - 20,
		height: 80,
		borderWidth: 2
	}
};
