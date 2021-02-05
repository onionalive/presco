import React, { Component } from 'react';
import { BaseUrl } from './../libs/baseUrl';
import 'slick-carousel';
import width from '../Config';

export default class PeopleRow extends Component {
	constructor(props) {
		super(props);

		$(window).resize(() => {
			this.checkSlick();
		});
	}

	componentDidUpdate() {
		this.checkSlick();
		this.hoverStatePerson();
	}

	componentDidMount() {
		this.checkSlick();
		this.hoverStatePerson();
	}

	hoverStatePerson() {
		var white = "#fff";
		var teal = "#008bac";
		const $singleBoard = $( ".our-leaders.single .people.-single-row .person" );
		const $executives = $( ".person.Executives" );
		const $board = $( ".person.Board" );
		$executives.hover(
			function() {
				$( this ).find(".hover-state").css({
					bottom: "0",
					backgroundColor: teal
				});
			}, function() {
			$( this ).find(".hover-state").css({
				bottom: "",
				backgroundColor: ""
			});
		}
		);
		$board.hover(
			function() {
				$( this ).find(".hover-state").css({
					bottom: "0",
					backgroundColor: white
				});
			}, function() {
			$( this ).find(".hover-state").css({
				bottom: "",
				backgroundColor: ""
			});
		}
		);
		$singleBoard.hover(
			function() {
				$( this ).find(".hover-state").css({
					bottom: "0",
					backgroundColor: white
				});
			}, function() {
			$( this ).find(".hover-state").css({
				bottom: "",
				backgroundColor: ""
			});
		}
		);
	}

	checkSlick() {
		if (this.props.title !== 'Our People') {
			this.classTitle = this.props.title.replace(/Our\s/g, '');
		}

		if (
			$(".people.-our-people").length > 0 &&
			(Object.keys(this.props.people).length !== 0)
		) {
			if ($(window).outerWidth() < 900) {
				if (!$(`.people.-our-people.${this.classTitle} .people-container`).hasClass('slick-initialized')) {
					this.setupSlick();
				}
			} else if ($(".people.-our-people .people-container").hasClass('slick-initialized')){
				this.removeSlick();
			}
		}
	}

	removeSlick() {
		$(".people.-our-people .people-container").slick('unslick');
	}

	setupSlick() {
		let responsive = [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					centerMode: true,
				}
			},
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					centerMode: true,
				}
			},
			{
				breakpoint: width.mobile,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
				}
			},
		];

		if ($(".people.-our-people .person").length > 4) {
			responsive.push({
				breakpoint: 1250,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					centerMode: true,
				}
			});
		}

		$(".people.-our-people .people-container").slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 5,
			initialSlide: 0,
			variableWidth: true,
			draggable: true,
			touchThreshold: 100,
			arrows: true,
			responsive,
		}).on('breakpoint', function() {
			$('.slick-prev').text('<');
			$('.slick-next').text('>');
		});

		$('.slick-prev').text('<');
		$('.slick-next').text('>');
	}

	render() {
		const baseUrl = BaseUrl();

		let people = '';
		if (Object.keys(this.props.people).length !== 0) {
			people = Object.keys(this.props.people).map((key) => {
				let person = this.props.people[key];
				return (
					<div
						key={key}
						className={`person ${this.classTitle}`}
					>
						<a href={`${baseUrl}/leaders/${person.slug}`}>
							<img src={ person.image } alt="" />
						</a>
						<a href={`${baseUrl}/leaders/${person.slug}`}>
							<p>{ person.name }</p>
							<p>{ person.position }</p>
							<p>{ person.company }</p>
						</a>
						<div className="hover-state"></div>
					</div>
				)
			});
		}

		let button = null;

		return (
			<section id={this.classTitle ? this.classTitle.toLowerCase().replace(/our\s/g, '') : ''} className={`people ${this.classTitle} -single-row -our-people`}>
				<div className="inner">
					<h2>{ this.props.title }</h2>
					<div className='people-container'>
						{ people }
					</div>
				</div>
				{ button }
			</section>
		);
	}
}
