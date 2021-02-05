/**
 * This is actually the TransactionDetailView
 * and needs to be updated
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, Image, ScrollView, ListView, SafeAreaView, RefreshControl } from 'react-native';
import axios from 'axios';
import { DateTime } from 'luxon';
/* user imports */
import Button from 'app/components/common/Button';
import Accordian from 'app/components/common/Accordian';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import SInfo from 'react-native-sensitive-info';
import { Tranxactor } from 'app/common';
import Images from 'app/img/Image';

/**
 * This view is actually the transaction list
 * modal 
 */
class OfferDetail extends Component {
	state = {
		transactions: [],
		page: 0,
		hasTransactions: true,
		refreshing: false
	};

	/**
	 * Init 0 rows
	 */
	componentWillMount() {
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = this.ds.cloneWithRows([]);
	}

	/**
	 * Fetch more transactions from Tranxactor
	 */
	loadMore = async () => {
		this.fetchTransactions();
	}

	/**
	 * Takes a list of transaction and updates the view.
	 * @param {*} transactions Add all transactions to the datasource for the rows
	 */
	updateTransactions(transactions) {
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = this.ds.cloneWithRows(transactions);

		if (transactions.length > 0) {
			this.setState({
				...this.state,
				hasTransactions: true,
				transactions
			});
		} else {
			this.setState({
				...this.state,
				hasTransactions: false,
				transactions
			});
		}
	}

	/**
	 * Update the list
	 */
	updateTransactionList(res) {
		try {
			const { page, transactions } = this.state;
			const newTransactions = res.data['_embedded'].transactions;

			newTransactions.map(d => {
				// need to change this to be local specific
				d.transactionDateTime = new Date(d.transactionDate).toDateString();
			});

			const transactionsList = transactions.concat(newTransactions);

			this.updateTransactions(transactionsList);
			this.setState({
				...this.state,
				transactions: transactionsList,
				page: page + 1
			});
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * Use master token to re-auth
	 */
	updateToken = async () => {
		try {
			const masterToken = await SInfo.getItem('masterToken', {});
			const res = Tranxactor.fetchResetToken(masterToken)
				.then(async res => {
					if (res.response && res.response.status === 400) {
						console.log('masterToken has likely expired and we are unable to authenticate');
						return;
					}

					await SInfo.setItem('token', res.data.token, {});
					await SInfo.setItem('masterToken', res.data.masterToken, {});
					this.fetchTransactions();
				})
				.catch(err => { throw err });
		} catch (err) {
			console.log(err);
			if (err.response.status && err.response.status === 400) {
				console.log('YO YO YO has likely expired and we are unable to authenticate');
			}
			throw err;
		}
	}

	/**
	 * Use the stored token to fetch the user transaction list
	 * and handle the returns depending on status.
	 */
	fetchTransactions = async () => {
		try {
			const { id } = this.props;
			const { page, transactions } = this.state;

			const token = await SInfo.getItem('token', {});
			const res = await Tranxactor.getTransactionList(id, token, page);
			if (res.status === 200) {
				this.updateTransactionList(res);
			}

			this.setState({refreshing: false});
		} catch (err) {
			if (err.response.status === 400) {
				console.log('ERR MESSAGE', err.response.data.errorMessage);
			}

			if (err.response.status === 401) {
				console.log('Please re-authenticate');
				console.log(this.props);
				this.updateToken();
			}

			this.setState({refreshing: false});
		}	
	}

	onRefresh() {
		this.setState({refreshing: true});
		this.fetchTransactions();
	}

	componentDidMount() {
		this.fetchTransactions();
	}

	componentWillReceiveProps(props) {
		if (this.state.refreshing) this.setState({refreshing: false});
	}

	/**
	 * Render each transactions as an Accordian
	 * @param {*} item Data to pass to an Accordian component
	 */
	renderRow(item) {
		return (
			<Accordian
				item={item}
			/>
		);
	}

	render() {
		const {
			textStyle,
			initStyle,
			flexCenter,
			headingStyle,
			headerStyle,
			modalMargin
		} = styles;

		const {
			button,
			text
		} = buttonStyles;

		const { hasTransactions } = this.state;

		if (__DEV__) console.log('Transaction list:', this.state.transactions);

		return (
			<SafeAreaView style={modalMargin}>
				<View style={headerStyle}>
					<Text style={headingStyle}>{this.props.title}</Text>
					<Button
						action={() => this.props.navigation.goBack(null)}
						accessibilityLabel={'Close modal.'}
					>
						<Image source={Images.closeWhite} />
					</Button>
				</View>
				{
					 hasTransactions ? 
					 <ListView
						dataSource={this.dataSource}
						enableEmptySections={true}
						renderRow={this.renderRow}
						style={{
							backgroundColor: Colours.cOffBlack
						}}
						refreshControl={
							<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
							/>
						}
					/> :
					<View style={{
						height: '100%',
						backgroundColor: Colours.cOffBlack,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<ScrollView
							refreshControl={
								<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh.bind(this)}
								/>
						  	}
						>
							<View style={{
								height: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: 20
							}}>
								<Text style={headingStyle}>No transactions</Text>
								<Text style={textStyle}>There are currently no transactions on record. Pull down and refresh to try again.</Text>
							</View>
						</ScrollView>
					</View>
				}
				<Button
					action={() => this.loadMore()}
					style={button}
					accessibilityLabel={'Button. Click to load more transactions.'}
				>
					<Text style={text}>Tap for more</Text>
				</Button>
			</SafeAreaView>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20,
		...Fonts.fUtility,
		color: Colours.cWhite,
		padding: 10
	},
	modalMargin: {
		// paddingTop: ifIphoneX ? 20 : 0,
		flex: 1
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	headingStyle: {
		color: Colours.cWhite,
		...Fonts.fHeadingMedium,
		fontSize: 24,
	},
	headerStyle: {
		backgroundColor: Colours.cOffBlack,
		height: 62,
		width: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 24,
		paddingBottom: 10,
		elevation: 2,
		zIndex: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	lowerHeading: {
		flexDirection: 'row'
	},
	subheadingStyle: {
		color: Colours.cOffWhite
	},
};

const buttonStyles = {
    button: {
        backgroundColor: Colours.cPrimary,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        minWidth: 180,
		alignItems: 'center'
    },
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    }
}

export default OfferDetail;
