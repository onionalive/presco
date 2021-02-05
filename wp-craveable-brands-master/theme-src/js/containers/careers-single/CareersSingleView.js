import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IntroMod from './../../components/IntroMod';
import BannerMod from './../../components/BannerMod';
import JobAdderMod from './../../components/JobAdderMod';
import BackButtonMod from './../../components/BackButtonMod';
import { BaseUrl } from './../../libs/baseUrl';

export default class CareersSingle extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage(this.props.params.career);
	}

	render() {
		const baseUrl = BaseUrl();

		return (
			<div className="careers-single">
				<BannerMod
					image={ this.props.careers.banner.image }
					copy={ this.props.careers.banner.copy }
				/>
				<BackButtonMod
					backURL={ `${baseUrl}/careers` }
					page={ 'careers' }
				/>
				<IntroMod
					heading_quote={this.props.careers.intro.headingQuote}
					cite={this.props.careers.intro.cite}
					copy={this.props.careers.intro.copy}
				/>
				<JobAdderMod
					job_adder_id={this.props.careers.jobAdderID}
					title={this.props.careers.title}
				/>
			</div>
		)
	}
}
