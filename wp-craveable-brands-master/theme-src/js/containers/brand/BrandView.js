import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import ImageCarouselMod from './../../components/ImageCarouselMod';
import BrandContentMod from './../../components/BrandContentMod';
import ContentTilesMod from './../../components/ContentTilesMod';
import IntroMod from './../../components/IntroMod';

export default class BrandView extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage();
	}

	render() {
		return (
			<div className='brand-primary'>
				<BannerMod
					image={ this.props.brands.banner.image }
					copy={ this.props.brands.banner.copy }
				/>
				<IntroMod
					heading_quote={this.props.brands.intro.headingQuote}
					cite={this.props.brands.intro.cite}
					copy={this.props.brands.intro.copy}
				/>
				<ContentTilesMod
					contentTiles={ this.props.brands.pages }
				/>
			</div>
		)
	}
};
