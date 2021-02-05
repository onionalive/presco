
import { Link } from 'react-router';
import { BaseUrl } from './../../libs/baseUrl';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.props.fetchHeader();
	}

	componentDidMount() {
		const mobileWidth = 1024;
		this.isMobile = $(window).width() < mobileWidth;
		this.$header = $('header');
		this.$logo = $('.nav-logo');
		this.$nav = $('.nav-list');
		this.headerHeightCompact = this.isMobile ? 48 : 70;

		this.navResize();
		this.clickEventHandler();
		this.navCurrent();
		this.smoothScroll();
	}

	componentDidUpdate() {
		this.navMobile();
	}

	navCurrent() {
		const pathname = window.location.pathname;
		const $responsibilities = $(".primary-header .inner .nav-list .nav-responsibility");
		const $brands = $(".primary-header .inner .nav-list .nav-brands");
		const $leaders = $(".primary-header .inner .nav-list .nav-leaders");
		const $careers = $(".primary-header .inner .nav-list .nav-careers");
		const $contact= $(".primary-header .inner .nav-list .nav-contact");

		if (pathname.indexOf('/responsibilities') > -1) {
			$responsibilities.addClass('-current');
		} else if (pathname.indexOf('/brand') > -1) {
			$brands.addClass('-current');
		} else if (pathname.indexOf('/leaders') > -1) {
			$leaders.addClass('-current');
		} else if (pathname.indexOf('/careers') > -1) {
			$careers.addClass('-current');
		} else if (pathname.indexOf('/contact') > -1) {
			$contact.addClass('-current');
		}
	}

	navMobile() {
		let url = window.location.href;
		url = url.slice(0, -1);

		if (url.indexOf('localhost') >= 0) {
			url = url.replace(window.location.origin, '');
		}

		$(`a[href="${url}"]`).addClass('-current');
	}

	navResize() {
		if (!this.isMobile) {
			$(window).on('scroll', () => {
				if ($(window).scrollTop() > $('section').eq(1).offset().top - this.headerHeightCompact) {
					this.$header.addClass('-compact');
					this.$logo.addClass('-compact');
					this.$nav.addClass('-compact');
				} else {
					this.$header.removeClass('-compact');
					this.$logo.removeClass('-compact');
					this.$nav.removeClass('-compact');
				}
			});
		}
	}

	smoothScroll() {
		$(document).ready(function ($) {
			$('.smooth-scroll').click(function () {
				event.preventDefault();
				$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
			});
		});
	}

	clickEventHandler() {
		$('.mobile-indicator, .mobile-nav ul .nav-contact').click(() => {
			$('body').toggleClass('overflow-hidden');
			$('.mobile-nav').toggleClass('-active');
			$('.mobile-indicator').toggleClass('-close');
		});

		$('.mobile-nav .fa-caret-down').click((e) => {
			e.preventDefault();
			var target = ($(e.target).attr('id'));
			switch (target) {
			case 'responsibility':
				$('.submobile-drop-down.-responsibility').toggleClass('-active');
				break;

			case 'our-brands':
				$('.submobile-drop-down.-our-brands').toggleClass('-active');
				break;

			case 'our-careers':
				$('.submobile-drop-down.-our-careers').toggleClass('-active');
				break;

			default:
				console.log('not in the switch');
			}
		});

		$('.mobile-nav .close').click(() => {
			if ($('.submobile-drop-down').hasClass('-active')) {
				$('.submobile-drop-down').removeClass('-active');
			} else {
				$('.submobile-drop-down').addClass('-active');
			}
		});
	}

	render() {
		const baseUrl = BaseUrl();
		return (
			<header className='primary-header' id='primary-header'>
				<div className='inner'>
				<a href={`${baseUrl}`} data-scroll='#home'>
					<p className='nav-logo'>craveable <br /> brands.</p>
				</a>
				<ul id='main-nav' className='nav-list'>
					<li className='nav-brands'>
						<a className='brands' href={`${baseUrl}/brand`}>Our brands</a>
						<ul className='drop-down -purple-nav'>
							{ this.props.header.brands &&
								this.props.header.brands.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/brand/${obj.slug}`}>
												<h3>{ obj.title }</h3>
												<p>{ obj.description }</p>
											</a>
										</li>
									)
								})
							}
						</ul>
					</li>
					<li className='nav-responsibility'>
						<a className='responsibility' href={`${baseUrl}/responsibilities`}>Our responsibility</a>
						<ul className='drop-down -green'>
							{ this.props.header.responsibilities &&
								this.props.header.responsibilities.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/responsibilities/${obj.slug}`}>
												<h3>{ obj.title }</h3>
												<p>{ obj.description }</p>
											</a>
										</li>
									)
								})
							}
						</ul>
					</li>
					<li className='nav-leaders' >
						<a href={`${baseUrl}/leaders`}>Our leaders</a>
						<ul className='drop-down -teal-nav'>
							{ this.props.header.leaderTypes &&
								this.props.header.leaderTypes.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/leaders/#${obj.slug}`}>
												<h3>{ obj.title }</h3>
												<p>{ obj.description }</p>
											</a>
										</li>
									)
								})
							}
						</ul>
					</li>
					<li className="nav-careers" >
					<a href={`${baseUrl}/careers`}>Our careers</a>
						<ul className='drop-down -yellow-nav'>
							{ this.props.header.careerTypes &&
								this.props.header.careerTypes.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/careers/${obj.slug}`}>
												<h3>{ obj.title }</h3>
											</a>
										</li>
									)
								})
							}
						</ul>
					</li>
					<li className="nav-contact"><a className="smooth-scroll" href="#contact-us">Our contacts</a></li>
				</ul>
				<button className='mobile-indicator'>
					<span className='label'>Toggle mobile menu</span>
					<span className='bar'></span>
				</button>
			</div>
			<div className='mobile-nav'>
				<ul className='nav-list-mobile'>
				<li className='nav-brands'>
					<a className='brands' href={`${baseUrl}/brand`}>Our brands</a>
						<ul className='submobile-drop-down -our-brands'>
							{ this.props.header.brands &&
								this.props.header.brands.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/brand/${obj.slug}`}>{ obj.title }</a>
											<p>{ obj.description }</p>
										</li>
									)
								})
							}
						</ul>
				</li>
					<li className='nav-responsibility'>
						<a className='responsibility' href={`${baseUrl}/responsibilities`}>Our responsibility</a>
							<ul className='submobile-drop-down -responsibility'>
								{ this.props.header.responsibilities &&
									this.props.header.responsibilities.map((obj, key) => {
										return (
											<li key={key}>
												<a href={`${baseUrl}/responsibilities/${obj.slug}`}>{ obj.title }</a>
												<p>{ obj.description }</p>
											</li>
										)
									})
								}
							</ul>
					</li>
					<li className="nav-leaders" ><a href={`${baseUrl}/leaders`}>Our leaders</a></li>
					<li className="nav-careers" >
						<a href={`${baseUrl}/careers`}>Our careers</a>
						<ul className='submobile-drop-down -our-careers'>
							{ this.props.header.careerTypes &&
								this.props.header.careerTypes.map((obj, key) => {
									return (
										<li key={key}>
											<a href={`${baseUrl}/careers/${obj.slug}`}>{ obj.title }</a>
										</li>
									)
								})
							}
						</ul>
					</li>
					<li className="nav-contact" ><a href="#contact-us">Our contacts</a></li>
				</ul>
			</div>
			</header>
		);
	}
}
