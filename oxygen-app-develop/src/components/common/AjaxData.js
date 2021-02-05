import React from 'react';
import { Text, View } from 'react-native';
import Colours from '../../styles/colours';
import Layout from '../../styles/layout';   
import Typography from '../../styles/typography';
import Cell from './Cell';
  
export default AjaxData = (props) => {

	const { textStyle, initStyle } = styles;
	const { flexCenter } = Layout;

	return (
		<Cell style={ [flexCenter, initStyle] }>
			<Text>{props.fromExample.title}</Text>
		</Cell>
	);
};

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		height: 40
	}
};
