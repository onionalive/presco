import React, { Component } from 'react';

export default class ContentTilesMod extends Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.$hover = $('.content-tile');
		this.tileHighlight();
	}

	tileHighlight() {
		this.$hover.hover(function() {
		 $(this).find('.overlay').toggleClass('filter');
		});
	}

	render() {
		let contentTiles = '';
		if (Object.keys(this.props.contentTiles).length !== 0) {
			contentTiles = Object.keys(this.props.contentTiles).map((index, key) => {
				let contentTile = this.props.contentTiles[key];
				const contentTileSize = contentTile.size;

				return (
					<a href={ contentTile.link } key={index} className={'content-tile -'	+ contentTileSize}>
					<div
						className='tile-image'
						alt=''
						style={ {backgroundImage: `url(${ contentTile.image })`} }
					></div>
						<div className='overlay'></div>
						<h2 className='content-tile-text'>{ contentTile.copy }</h2>
					</a>
				)
			});
		}

		return (
			<section className='content-tiles-mod'>
				<div className='inner'>
					<div className='row'>
						{ contentTiles }
					</div>
				</div>
			</section>
		);
	}
}
