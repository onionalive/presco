import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IntroMod from './../../components/IntroMod';
import BannerMod from './../../components/BannerMod';
import ContentTilesMod from './../../components/ContentTilesMod';

export default class Responsibilities extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage();
	}

	render() {
		return (
			<div className='responsibilities'>
				<BannerMod
					image={this.props.responsibilities.banner.image}
					copy={this.props.responsibilities.banner.copy}
				/>
				<IntroMod
					heading_quote={this.props.responsibilities.intro.headingQuote}
					cite={this.props.responsibilities.intro.cite}
					copy={this.props.responsibilities.intro.copy}
				/>
				<ContentTilesMod
					contentTiles={this.props.responsibilities.pages}
				/>
			</div>
		);
	}
}
