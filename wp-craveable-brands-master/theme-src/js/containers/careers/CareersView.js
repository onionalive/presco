import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IntroMod from './../../components/IntroMod';
import BannerMod from './../../components/BannerMod';
import CareersSelectMod from './../../components/CareersSelectMod';
import JobAdderMod from './../../components/JobAdderMod';
import Row from './../../components/Row';

export default class Careers extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage();
	}

	render() {
		return (
			<div className="careers">
				<BannerMod
					image={ this.props.careers.banner.image }
					copy={ this.props.careers.banner.copy }
				/>
				<IntroMod
					heading_quote={this.props.careers.intro.headingQuote}
					cite={this.props.careers.intro.cite}
					copy={this.props.careers.intro.copy}
				/>
				<CareersSelectMod
					careerTiles={ this.props.careers.pages }
				/>
				{this.props.careers.rows.length > 0 &&
					<Row row={ this.props.careers.rows[0] } />
				}
				{this.props.careers.rows.length > 1 &&
					<Row row={ this.props.careers.rows[1] } />
				}
				{this.props.careers.rows.length > 2 &&
					<Row row={ this.props.careers.rows[2] } />
				}
				{this.props.careers.rows.length > 3 &&
					<Row row={ this.props.careers.rows[3] } />
				}
				{this.props.careers.rows.length > 4 &&
					<Row row={ this.props.careers.rows[4] } />
				}
				{this.props.careers.rows.length > 5 &&
					<Row row={ this.props.careers.rows[5] } />
				}
			</div>
		)
	}
}
