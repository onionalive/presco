import React from 'react';
import { BaseUrl } from './../libs/baseUrl';

export default class OurBrandsMod extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let brandTiles = '';
		const baseUrl = BaseUrl();

		if (Object.keys(this.props.brandTiles).length !== 0) {
			brandTiles = Object.keys(this.props.brandTiles).map((index, key) => {
				let brandTile = this.props.brandTiles[key];

				return (
					<div className="brand" key={index} style={ {backgroundImage: `url(${	brandTile.backgroundImage })`} } alt="">
						<div className="logo" style={ {backgroundImage: `url(${	brandTile.logo })`} } alt=""></div>
						<a className="button" href={`${baseUrl}/brands/${brandTile.brand}`}>{ brandTile.buttonText }</a>
					</div>
				)
			})
		}

		return (
			<section className="our-brands-mod">
				<div className="inner">
					<div className="row">
						<div className="heading-div -half">
							<h2 className="left-copy"> { this.props.heading } </h2>
						</div>

						<div className="copy-div -half">
							<p dangerouslySetInnerHTML={{__html: this.props.copy}}></p>
						</div>
					</div>

				</div>


				<div className="row">
				{ brandTiles }
				</div>
			</section>
		);
	}
}
