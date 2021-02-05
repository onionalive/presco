import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import PeopleRow from './../../components/PeopleRow';

export default class OurLeaders extends Component {
	constructor(props) {
		super(props);
		this.props.fetchPage();
	}

	componentDidUpdate() {
		this.scrollToHash();
	}

	scrollToHash() {
		const windowHash = window.location.hash.replace('#', '');
		const hashID = document.getElementById(windowHash);
		hashID.scrollIntoView();
	}

	render() {
		return (
			<div className='our-leaders'>
				<BannerMod
					image={ this.props.page.banner.image }
					copy={ this.props.page.banner.copy }
				/>
				<PeopleRow
					type={'executives'}
					title={'Our Executives'}
					people={ this.props.page.executives }
				/>
				<PeopleRow
					type={'board'}
					title={'Our Board'}
					people={ this.props.page.board }
				/>
			</div>
		);
	}
}
