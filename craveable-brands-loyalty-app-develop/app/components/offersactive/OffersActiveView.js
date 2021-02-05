import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, ListView, RefreshControl, ScrollView } from 'react-native';
import axios from 'axios';

/* user imports */
import ItemOffer from 'app/components/common/ItemOffer';
import SInfo from 'react-native-sensitive-info';

class OffersActive extends Component {
	constructor(props) {
		super(props);
	    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
	    	dataSource: ds.cloneWithRows(props.offers),
	      	refreshing: false
	    };
	}
	/**
	 * Default the data source with the reducer initial 
	 * state items. Needs to become decoupled down
	 * the track.
	 */
	/**
	 * Return active offers
	 * @param {*} item List of active offers
	 */
	renderRow(item) {
		const { navigation } = this.props;
		return <ItemOffer
					item={item}
					navigation={navigation}
					list
				/>;
	}

	onRefresh = async () => {
		try {
			this.setState({refreshing: true});
			const { getOffersActive, id } = this.props;
			const token = await SInfo.getItem('token', {});
			getOffersActive(id, token);
		} catch(err) {
			console.log('Refresh error', err);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.refreshing) this.setState({refreshing: false});
		if (nextProps.offers != this.props.offers){
			this.setState({
		      dataSource: this.state.dataSource.cloneWithRows(nextProps.offers)
		    })
		}
	}

	render() {
		const { textStyle, initStyle, flexCenter, headingStyle, linkStyle } = styles;
		const { error, empty } = this.props.copy;

	if (this.props.offers.length > 0) {
			try {
				return (
					<ListView
						dataSource={this.state.dataSource}
						enableEmptySections={true}
						renderRow={(item) => this.renderRow(item)}
						automaticallyAdjustContentInsets={false}
						contentInset={{
							bottom: 20
						}}
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							backgroundColor: Colours.cWhite,
						}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh}
							/>
						}
					/>
				);
			} catch (err) {
				console.log(err);
				return (
					<View style={{
						height: '100%',
						backgroundColor: Colours.cOffBlack,
						flex: 1
					}}>
						<ScrollView refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>}
							contentContainerStyle={{flexGrow: 1}}
						>
							<Text style={headingStyle}>{error.heading}</Text>
							<Text style={textStyle}>{error.body}</Text>
							<Text style={[textStyle, linkStyle]}>{error.link}</Text>
						</ScrollView>
					</View>
				);
			}
		} else {
			return (
				<View style={{
					height: '100%',
					backgroundColor: Colours.cOffBlack,
					flex: 1
				}}>
					<ScrollView refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
						/>}
						contentContainerStyle={{flexGrow: 1}}
					>
						<Text style={headingStyle}>{empty.heading}</Text>
						<Text style={textStyle}>{empty.body}</Text>
					</ScrollView>
				</View>
			);
		}
	}
}

const styles = {
	textStyle: {
		fontSize: 20,
		...Fonts.fBodyText,
		color: Colours.cWhite,
		textAlign: 'center',
		lineHeight: 40,
		top: 140
	},
	linkStyle: {
		fontWeight: '700'
	},
	headingStyle: {
		...Fonts.fHeadingLarge,
		color: Colours.cWhite,
		textAlign: 'center',
		top: 100
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default OffersActive;
