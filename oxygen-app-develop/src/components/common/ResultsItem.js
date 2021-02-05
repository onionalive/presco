import React from 'react';
import { Text, View } from 'react-native';
import {Oxygen} from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import {Actions} from 'react-native-router-flux';
import Dimensions from 'Dimensions';

export default ResultsItem = (props) => {

	const { marginBottom, blueBox, text, valueText, valueTextSml } = styles;
	const { flexCenter } = Layout;
	const { title, amount } = props;

	const textStyling = amount.toString().length > 8 ? valueTextSml : valueText;

	return (
		<View>
			<View>
				<Text style={[text, marginBottom]}>{title}</Text>
			</View>
			<View style={[blueBox, marginBottom]}>
				<Text style={textStyling}>${amount.toLocaleString()}</Text>
			</View>
		</View>
	);
};

const styles = {
	marginBottom: {
		marginBottom: 10,
		width: Dimensions.get('window').width - 60,
	},
	blueBox: {
		flex:1,
		minHeight: 56,
		width: Dimensions.get('window').width - 60,
		paddingLeft: 14,
		paddingRight: 14,
		paddingBottom: 10, 
		paddingTop: 14,
		backgroundColor: '#F3F3F3',
		shadowColor: '#AAAAAA',
		shadowOpacity: 0.5,
		shadowOffset: {width: 0, height: 2},
	},
	text: {
		flex:1,
		color: Oxygen.grey,
		fontSize: 20,
		textAlign: 'right',
		fontFamily: 'ProximaNova-Bold'
	},
	valueText: {
		flex:1,
		color: Oxygen.black,
		fontSize: 42,
		textAlign: 'right',
		fontFamily: 'ProximaNova-Regular',
	},
	valueTextSml: {
		flex:1,
		color: Oxygen.black,
		fontSize: 28,
		textAlign: 'right',
		fontFamily: 'ProximaNova-Regular',
	},
};