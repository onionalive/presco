import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import ImageCarouselMod from './../../components/ImageCarouselMod';
import BrandContentMod from './../../components/BrandContentMod';
import BackButtonMod from './../../components/BackButtonMod';
import { BaseUrl } from './../../libs/baseUrl';

export default class BrandSingleView extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage(this.props.params.slug);
	}

	render() {
		const baseUrl = BaseUrl();

		return (
			<div className={this.props.routeParams.slug}>
				<BannerMod
					image={ this.props.brand.banner.image }
					copy={ this.props.brand.banner.copy }
				/>
				<BackButtonMod
					backURL={ `${baseUrl}/brand` }
					page={ 'brands' }
				/>
				<BrandContentMod
					title={ this.props.brand.title }
					copy={ this.props.brand.content }
					ceoImage={ this.props.brand.leader.image }
					ceoName={ this.props.brand.leader.name }
					ceoTitle={ this.props.brand.leader.position }
					ceoSlug={ this.props.brand.leader.slug }
					links={this.props.brand.links}
					logo={this.props.brand.logo}
				/>
				<ImageCarouselMod
					images={ this.props.brand.carouselImages }
				/>
			</div>
		);
	}
}
