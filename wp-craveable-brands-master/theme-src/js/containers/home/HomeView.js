import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import IntroMod from './../../components/IntroMod';
import OurBrandsMod from './../../components/OurBrandsMod';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage();
	}

	render() {
		return (
			<div className='home'>
				<BannerMod
					image={ this.props.home.banner.image }
					copy={ this.props.home.banner.copy }
				/>
				<IntroMod
					heading_quote={this.props.home.intro.headingQuote}
					cite={this.props.home.intro.cite}
					copy={this.props.home.intro.copy}
				/>
				<OurBrandsMod
					heading={this.props.home.brand.heading}
					copy={this.props.home.brand.copy}
					brandTiles={this.props.home.brand.brands}
				/>
				<h1>craveable brands.</h1>
			</div>
		);
	}
}
