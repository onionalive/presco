import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BannerMod from './../../components/BannerMod';
import PeopleRow from './../../components/PeopleRow';
import BackButtonMod from './../../components/BackButtonMod';
import { BaseUrl } from './../../libs/baseUrl';

export default class LeadersSingle extends Component {
	constructor(props) {
		super(props);
		this.props.fetchLeader(this.props.params.leader);
	}

	render() {
		const baseUrl = BaseUrl();
		let peopleRowShow;
		if (this.props.leader.type === 'executives') {
			peopleRowShow = (
				<PeopleRow
					type={'executives'}
					title={'Our Executives'}
					people={this.props.executives}
				/>
			);
		} else if (this.props.leader.type === 'board') {
			peopleRowShow = (
				<PeopleRow
					type={'board'}
					title={'Our Board'}
					people={this.props.board}
				/>
			);
		}

		return (
			<div>
				<section className='leader-section'>
					<BackButtonMod
						backURL={ `${baseUrl}/leaders` }
						page={ 'leaders' }
					/>
					<div className='leader inner'>
						<div className='lhs'>
							<div className='titles'>
								<div>
									<h1>
										{this.props.leader.title}
									</h1>
									<span className='position' >
										{this.props.leader.position}
									</span>
									<br />
									<span className='company' >
										{this.props.leader.company}
									</span>
									{this.props.leader.linkedin &&
										<a className='linkedin-button' href={this.props.leader.linkedin} target='_blank'><i className='fa fa-linkedin-square' aria-hidden='true' /> LinkedIn</a>
									}
								</div>
								<img className='image -mobile' alt='' src={this.props.leader.image} />
							</div>
							<div className='description' dangerouslySetInnerHTML={{ __html: this.props.leader.description }} />
						</div>
						<div className='image -desktop'>
							<img src={this.props.leader.image} alt='' />
						</div>
					</div>
				</section>
				<div className='our-leaders single'>
					{peopleRowShow}
				</div>
			</div>
		);
	}
}
