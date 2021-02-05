import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Platform, Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';
import Typography from '../../styles/typography';
import axios from 'axios';

import Answer from '../common/Answer';
import VerficationContainer from '../common/VerificationContainer';

class QuestionSetView extends Component {

	render() {

		const {
			text,
			verification,
			nextState,
			btnNext,
			btnState,
			btnActive,
			btnInactive,
			tickImage
		} = styles;

		const { flexCenter, flexColumn, center, middle } = Layout;

		const { prev, next, tickBool, title } = this.props;

		return (
			<View>
				<ScrollView showsVerticalScrollIndicator={false} >
					<View style={{ marginBottom: 20 }}>
						<View>
							<Text style={[text, center, { paddingTop: 10, paddingBottom: 10 }]}>{title}</Text>
							<View style={{ marginBottom: 10 }}>
								{this.props.children}
							</View>
							<View style={btnNext}>
								<TouchableHighlight
									onPress={next}
									underlayColor='rgba(0,0,0,0)'
								>
									<View style={[btnState, tickBool ? btnActive : btnInactive ]}>
										<Image style={ tickImage } source={tickBool ? require('../../img/tick-active-white.png') : require('../../img/tick-inactive-white.png')} />
										<Text style={nextState}>Next</Text>
									</View>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = {
	text: {
		color: Oxygen.grey,
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold',
		textAlign: 'center'
	},
	tickImage: {
		height: 18,
		width: 18,
		marginTop: Platform.OS === 'android' ? 9 : 5,
		marginRight: 4,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
	nextState: {
		color: Oxygen.white,
		fontSize: 20,
		padding: 4,
		textAlign: 'center',
		fontFamily: 'ProximaNova-Bold',
		textAlign: 'right',
	},
	btnNext: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	btnState: {
		flexDirection: 'row',
		padding: 10,
		paddingLeft: 14,
		paddingRight: 14,
		borderRadius: 4
	},
	btnInactive: {
		backgroundColor: Oxygen.lightGrey,
	},
	btnActive: {
		backgroundColor: Oxygen.green,
	}
};

export default QuestionSetView;
