import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, AsyncStorage } from 'react-native';
import Layout from '../../styles/layout';
import { setFavourite } from '../home/HomeReducer';
import { connect } from 'react-redux';
import { BucketOne } from '../../styles/colours';
import {Actions} from 'react-native-router-flux';
import { Oxygen } from '../../styles/colours';

class ListItem extends Component {
	renderDescription() {
		const { item, expanded } = this.props;

		if (expanded) {
			return (
				<Text>{item.bio}</Text>
			);
		}
	}

	render() {
		const { flexCenter } = Layout;
		const { titleStyle, tableCell, profileImage, starButton, container, starCell } = styles;

		const { fullName, image, id, setFavourite, email, phone } = this.props.item;
		const { storedId, isIdSet } = this.props;

		const thumbnail = (image) ? image : 'https://facebook.github.io/react/img/logo_og.png';

		return (  
			<View style={container}>
				<TouchableWithoutFeedback
					onPress={() => Actions.profile(this.props.item)} 
				>
					<View style={ tableCell }>
						<Image style={ profileImage } source={(image) ? {uri: image} : require(`../../img/oxygen-icon.png`)} />
						<Text style={ titleStyle }>{fullName.length > 18 ? fullName.substr(0, 16) + '...' : fullName}</Text>
						{this.renderDescription()}
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => this.props.action(id, fullName, email, phone, image)}>
					<View style={starCell}>
						<Image style={ starButton } source={storedId === id ? require('../../img/btn_fav_active.png') : require('../../img/btn_fav.png')} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: 'transparent',
		borderBottomColor: Oxygen.lightGrey,
	},
	starButton: {
		width: 25,
		height: 25,
		margin: 7.5,
		borderRadius: 10
	},
	titleStyle: {
		fontSize: 18,
		paddingTop: 12,
		paddingBottom: 8,
		paddingLeft: 15,
		color: Oxygen.darkGrey,
		fontWeight: 'bold',
		justifyContent: 'center',
		fontFamily: 'ProximaNova-Semibold'
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	tableCell: {
		flexDirection: 'row',
		flex: 0.9,
		height: 60,
		padding: 10,
		paddingLeft: 0,
		paddingRight: 0,
		marginLeft: 10,
	},
	starCell: {
		flexDirection: 'row',
		flex: 0.1,
		height: 60,
		padding: 10,
		marginRight: 10,
	},
}

const mapStateToProps = (state, ownProps) => {
	const expanded = ownProps.item.id === state.tableData;
	return { 
		expanded,
		storedId: state.homeReducer.storedId,
		isIdSet: state.homeReducer.isIdSet
	};
};

export default connect(mapStateToProps, { setFavourite })(ListItem);
