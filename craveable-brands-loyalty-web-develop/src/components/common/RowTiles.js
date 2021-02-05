import React, { Component } from 'react';
import Tile from 'components/common/SingleTile';

export default class RowTiles extends Component {

	renderTitle() {
		const { title, type } = this.props;
		let link;

		if (type === 'promo') {
			link = '/promotions'
		} else if (type === 'offer') {
			link = '/offers'
		} else {
			console.log('Error: No type/link specified');
		}

		return (
			<div className="heading-container">
				<h3>{title}</h3>
				<a href={link} className="view-link">View all ></a>
			</div>
		);
	}

	render() {
		const { type, title, notch } = this.props;

		return (
			<div className="row-tiles">
				{ title ? this.renderTitle() : null }
				<div className="row">
					<Tile
						type={type} 
						notch={notch}
					/>
					<Tile 
						type={type}
						notch={notch}
					/>
					<Tile 
						type={type}
						notch={notch}
					/>
				</div>
			</div>
		);
	}
}