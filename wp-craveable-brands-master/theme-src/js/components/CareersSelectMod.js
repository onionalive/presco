import React, { Component } from 'react';

export default class CareersSelectMod extends Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		this.$hover = $('.career-tile');
		this.tileHighlight();

	}

	tileHighlight() {
		this.$hover.hover(function() {
		 $(this).find(".overlay").toggleClass('filter');
		});
	}

	render() {
		let careerTiles = '';
		if (Object.keys(this.props.careerTiles).length !== 0) {
			careerTiles = Object.keys(this.props.careerTiles).map((index, key) => {
				let careerTile = this.props.careerTiles[key];
				const contentTileSize = careerTile.size;

				return (
					<a href={ careerTile.link } key={index} className={"career-tile"}>
					<div className="tile-image" alt=""
					style={ {backgroundImage: `url(${ careerTile.image })`} }></div>
					<div className="overlay"></div>
					<h2 className="career-tile-text">{ careerTile.copy }</h2>
					</a>
				)
			});
		}

		return (
			<section className="careers-select-mod">
				<div className="inner">
					<h2>Job's You'll Love</h2>
					<div className="row">
						{ careerTiles }
					</div>
				</div>
			</section>
		);
	}
}
