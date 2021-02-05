import React, { Component } from 'react';
import Images from 'img/Image';
import $ from 'jquery';

export default class ListRow extends Component {
	constructor(props) {
		super(props);
		this.state = { toggleView: false };
		this.open = this.open.bind(this);
	}

	open(e) {
		this.setState ({
			...this.state,
			toggleView: !this.state.toggleView
		});


		let test = $(e.target).find('.expanded-view');
		$(test).toggleClass('-show');
	}

	renderValue(item) {
		switch (item.transactionType.id) {
			case '1':
				return `$${item.purchaseValue.toFixed(2)}`;
			case '21':
				return `+$${item.loyaltyValue.toFixed(2)}`;
			case '23':
				return `+$${item.loyaltyValue.toFixed(2)}`;
			default:
				return '';
		}
	}

	render() {
		console.log('transactions', this.props);

		let transactions = '';
		if (Object.keys(this.props.transactions).length !== 0) {
			transactions = Object.keys(this.props.transactions).map((key) => {
				let transaction = this.props.transactions[key];
				return (
					<div className="list-row" key={key} onClick={this.open}>
						<div className="default-view">
							<div className="align-left">
								<img src={Images.Oporto.chevronRightBlack} alt="" className="chevron" ref="chevron" />
								<p className="date">{ transaction.transactionDateTime }</p>
							</div>
							<div className="align-right">
								<p className="bold">{ this.renderValue(transaction) }</p>
							</div>
						</div>
						<div className="expanded-view">
							<div className="align-left">
								<p className="additional">{ transaction.storeName }</p>
							</div>
							<div className="align-right">
								{/*<p className="bold transaction">{ transaction.loyaltyValue }</p>*/}
								<p className="additional">{ transaction.transactionType.value }</p>
							</div>
						</div>
					</div>
				)
			});
		}

		return (
			<div className="transactions-list">
				<div className="header-row">
					<div className="align-left">
						<p>Your transactions</p>
					</div>
					{/*TODO: make Earnt/Used dynamic*/}
					<div className="align-right">
						<p>Earnt/Used</p>
						<p>Total: +$354.65 / -$100.32</p>
					</div>
				</div>
				<div className="list-container">
					{ transactions }
					<div className="list-row" key="key" onClick={this.open}>
						<div className="default-view">
							<div className="align-left">
								<img src={Images.Oporto.chevronRightBlack} alt="" className="chevron" ref="chevron" />
								<p className="date">30th February, 2018</p>
							</div>
							<div className="align-right">
								<p className="bold">$100</p>
							</div>
						</div>
						{/*dummy data*/}
						<div className="expanded-view">
							<div className="align-left">
								<p className="additional">Redfern</p>
							</div>
							<div className="align-right">
								{/*<p className="bold transaction">{ transaction.loyaltyValue }</p>*/}
								<p className="additional">Birthday reward</p>
							</div>
						</div>
						{/*end dummy data*/}
					</div>
				</div>
			</div>
		);
	}

}