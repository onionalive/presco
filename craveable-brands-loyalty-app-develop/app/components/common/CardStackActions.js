import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

/* user imports */

export const CardStackActions = ({toss}) => {
	return (
		<View style={styles.actionBar}>
			<View style={{ bottom: 25 }}>
				<TouchableOpacity
					style={styles.buttonDislikeC}
					onPress={() => toss('left')}
				>
					<Text style={styles.buttonTextDislike}>Dislike</Text>
				</TouchableOpacity>
			</View>
			<View style={{ bottom: 25 }}>
				<TouchableOpacity
					style={styles.buttonLikeC}
					onPress={() => toss('right')}
				>
					<Text style={styles.buttonTextLike}>Like</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = {
	actionBar: {
		height: 50,
		position: 'absolute',
		bottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingLeft: 13,
		paddingRight: 13,
	},
	buttonDislikeC: {
		height: 75,
		width: 75,
		borderColor: '#f6f6f6',
		borderWidth: 2,
		borderRadius: 75,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonTextDislike: {
		alignItems: 'center',
		justifyContent: 'center',
		color: 'red',
	},
	buttonLikeC: {
		height: 75,
		width: 75,
		borderColor: '#f6f6f6',
		borderWidth: 2,
		borderRadius: 75,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonTextLike: {
		alignItems: 'center',
		justifyContent: 'center',
		color: 'green',
	},
};
export default CardStackActions;
