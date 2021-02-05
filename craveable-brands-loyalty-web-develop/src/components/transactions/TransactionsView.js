import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Tranxactor from 'common/Tranxactor';
import Master from 'components/master/Master';
import ThirdNav from 'components/common/ThirdNav';
import ListRow from 'components/common/ListRow';
import moment from 'moment';

export default class Transactions extends Component {

	constructor(props) {
		super(props);
	}

	state = {
		transactions: [],
		page: 0,
		hasTransactions: true,
	};

	async componentDidUpdate(data) {
		if ( 
			this.props.profile.token &&
			this.props.profile.id &&
			this.state.transactions.length === 0
		) {
		this.fetchTransactions();
		}
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
				d.transactionDateTime = moment(d.transactionDate).local().format('Do MMMM, YYYY');
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
	 * Use the stored token to fetch the user transaction list
	 * and handle the returns depending on status.
	 */
	fetchTransactions = async () => {
		try {
			const { id } = this.props.profile;
			const { page, transactions } = this.state;

			const token = this.props.profile.token;
			const res = await Tranxactor.getTransactionList(id, token, page);
			if (res.status === 200) {
				console.log('yay');
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
				// this.updateToken();
			}

			this.setState({refreshing: false});
		}	
	}

	render() {
		const { hasTransactions } = this.state;

		return (
			<Master>
				<div className="transactions">
					<ThirdNav
						title="Transactions"
					/>
					<div className="secondary-container">
						{ hasTransactions ?
							<div>
								<ListRow
									transactions={this.state.transactions}
								/>
								<span className="button" onClick={this.loadMore}>Load More</span>
							</div>
							: 
							<div className="no-transactions">
								<h3>No transactions</h3>
								<p>There are currently no transactions on record.</p>
								<p>Please refresh page to try again.</p>
							</div>
						}
					</div>
				</div>
			</Master>
		);
	}
}
