/* jshint ignore:start */
import anime from 'animejs';

// js hint is ignored for entire docuemnt. Anime animations are used by declaring
// the variable in a const and never using it. This was throwing errors and not allowing
// the JS to be compiled.

// Documentation -
// 1) Start: All screens set to display: none
// 2) initScreen() runs - grabs screen to load and calls the correct functions
// 3) firstAnimation() (or whatever function is for the current screen) runs
//     -loads in current screen (decided by this.currentScreen)
//     -creates all animations required for that screen and applies them the this.animation(num)
//     -pauses the animation after first half is completed
// 4) On click (handled by this.clickEventHandler()) waits for user input. On:
//     -Next: second half of the animation is played. Screen and all animations states are reset,
//            this.currentScreen is incremented by one, and initScreen() is re-ran with new screen
//     -Previous: Animation does not finish. Screens and animation states reset, this.currentScreen
//						decremented by one and initScreen() re-ran with new screen
//     -Navigation Buttons Pressed: Animations does not finish. this.currentScreen is set to
//             screen correlation to nav button pressed. initScreen() is re-ran
// Thats it! That is the basic flow of the code. I'll futher document each major function below

export default class FrontPageAnimation {
	constructor() {
		// Init decleration for each animation
		this.bottleSlideInOutAnimation = anime.timeline();
		this.bottleDropDownUpExplosionAnimation = anime.timeline();
		this.heartsShapeAnimation = anime.timeline();
		this.heartsShootOutAnimation = anime.timeline();
		this.bottleSlideRooAnimation = anime.timeline({
			loop: true
		});
		this.rooJumpingAnimation = anime.timeline({
			loop: true
		});
		this.animations = [
			this.bottleSlideInOutAnimation,
			this.bottleDropDownUpExplosionAnimation,
			this.heartsShapeAnimation,
			this.heartsShootOutAnimation,
			this.bottleSlideRooAnimation,
			this.rooJumpingAnimation,
		];

		this.$firstAnimationTarget = document.querySelectorAll('.animationOne .bottle');
		this.$firstContent = document.querySelector('.animation-screen.-one');
		this.$secondAnimationTarget = document.querySelectorAll('.animationTwo .bottle');
		this.$secondAnimationMainTarget = document.querySelector('.animationTwo .-middle');
		this.$secondContent = document.querySelector('.animation-screen.-two');
		this.$thirdContent = document.querySelector('.animation-screen.-three');
		this.$fourthAnimationTarget = document.querySelectorAll('.animationFour .bottle');
		this.$fourthContent = document.querySelector('.animation-screen.-four');
		this.$screenSelectorOne = document.querySelector('.screenOne');
		this.$screenSelectorTwo = document.querySelector('.screenTwo');
		this.$screenSelectorThree = document.querySelector('.screenThree');
		this.$screenSelectorFour = document.querySelector('.screenFour');
		this.$particles = document.querySelectorAll('.animationTwo .particle');
		this.$screens = [
			this.$firstContent,
			this.$secondContent,
			this.$thirdContent,
			this.$fourthContent
		];
		this.animationTargets = [
			this.$firstAnimationTarget,
			this.$secondAnimationTarget,
			this.$thirdAnimationTarget
		];
		this.screenSelectorButtons = [
			this.$screenSelectorOne,
			this.$screenSelectorTwo,
			this.$screenSelectorThree,
			this.$screenSelectorFour
		];
		this.screenLoadInSpeed = 750; // in ms
		this.slideInOutSpeed = 100; // in ms
		this.currentScreen = 0; // 0 indexed
		this.numberOfHearts = 54;
		this.easings = ['easeOutQuad', 'easeOutSine', 'easeOutCubic', 'easeOutQuint', 'easeOutExpo', 'easeOutCirc'];
	}
	init() {
		this.initScreen();
		this.clickEventHandler();
	}

	// Hides all the screens & runs toggleScreens
	initScreen() {
		for (const screen of this.$screens) {
			$(screen).fadeOut(this.screenLoadInSpeed);
		}
		setTimeout(() => { this.toggleScreens(); }, this.screenLoadInSpeed);

		$(this.screenSelectorButtons[this.currentScreen]).addClass('-active');
	}

	// Switch between functions for loading the proper current screen
	toggleScreens() {
		switch (this.currentScreen) {
		case 0:
			this.firstAnimation();
			break;
		case 1:
			this.secondAnimation();
			break;
		case 2:
			this.thirdAnimation();
			break;
		case 3:
			this.fourthAnimation();
			break;
		default:
			console.log('default');
		}
	}

	// Same general structure as secondAnimation, thirdAnimation, and fourthAnimation, etc.
	// runs fadeIn() on current screen.
	// generates proper animations needed for current screen animation
	// assigned them to variables and .add's them to the animation declared in the constructor
	// pauses animation after the `first half` is finished
	firstAnimation() {
		const screenToLoad = this.$screens[this.currentScreen];
		if (this.bottleSlideInOutAnimation.children.length >= 1) {
			this.bottleSlideInOutAnimation.restart();
		}
		$(screenToLoad).fadeIn(this.screenLoadInSpeed, () => {
			if (this.bottleSlideInOutAnimation.children.length <= 0) {
				const animeStart = this.slideInFromRight(this.$firstAnimationTarget);
				const animeEnd = this.slideOutToLeft(this.$firstAnimationTarget);
				this.bottleSlideInOutAnimation
					.add(animeStart)
					.add(animeEnd);
			}
			this.bottleSlideInOutAnimation.children[0].complete = () => {
				this.bottleSlideInOutAnimation.pause();
			};
		});
	}

	// Finishes the current animation, then runs functions to reset all animations
	// and reinit the next animation
	firstAnimationFinish() {
		this.bottleSlideInOutAnimation.children[1].play();
		this.bottleSlideInOutAnimation.children[1].complete = () => {
			this.clearAllAnimations();
			this.initScreen();
		};
	}

	// 'Blah' bottles slide and fireworks explosion
	secondAnimation() {
		this.$secondAnimationMainTarget.style.removeProperty('background-image');
		const screenToLoad = this.$screens[this.currentScreen];
		$(screenToLoad).fadeIn(this.screenLoadInSpeed, () => {
			if (this.bottleDropDownUpExplosionAnimation.children.length >= 1) {
				this.bottleDropDownUpExplosionAnimation.restart();
				$('.bottle.-middle').addClass('-blah');
			} else {
				const animeStart = this.slideInFromRight(this.$secondAnimationTarget);
				const animeSlideDownMain = this.slideDown(this.$secondAnimationMainTarget);
				const animeSlideDownBlahs = this.slideDownBlahSlideUpMiddle(this.$secondAnimationTarget);
				const animeParticleExplosion = this.animateExplosion();
				const animeEnd = this.slideOutToLeft(this.$secondAnimationTarget);
				this.bottleDropDownUpExplosionAnimation
					.add(animeStart)
					.add(animeSlideDownMain)
					.add(animeSlideDownBlahs)
					.add(animeParticleExplosion)
					.add(animeEnd);
			}
			this.bottleDropDownUpExplosionAnimation.children[1].complete = () => {
				const newBottleImage = $('.animationTwo .-middle').data('image');
				$('.animationTwo .-middle').css('background-image', `url(${newBottleImage})`);
				$('.animationTwo .-middle').removeClass('-blah');
			};
			this.bottleDropDownUpExplosionAnimation.children[3].complete = () => {
				this.bottleDropDownUpExplosionAnimation.pause();
			};
		});
	}

	secondAnimationFinish() {
		this.bottleDropDownUpExplosionAnimation.play();
		this.bottleDropDownUpExplosionAnimation.children[4].complete = () => {
			this.clearAllAnimations();
			this.initScreen();
		};
	}

	// Hearts
	thirdAnimation() {
		const screenToLoad = this.$screens[this.currentScreen];
		$(screenToLoad).fadeIn(this.screenLoadInSpeed, () => {
			$.when(this.renderHeartsToDom()).then(() => {
				$('.heart').show();
				if (this.heartsShapeAnimation.children.length >= 1) {
					this.heartsShapeAnimation.restart();
				} else {
					const animation = this.animateHearts();
					this.heartsShapeAnimation
						.add(animation);
				}
			});
		});
	}

	thirdAnimationFinish() {
		if (this.heartsShootOutAnimation.children.length >= 1) {
			this.heartsShootOutAnimation.restart();
		} else {
			const animation = this.shootHearts();
			this.heartsShootOutAnimation
				.add(animation);
		}
		this.heartsShootOutAnimation.complete = () => {
			$('.heart').hide();
			this.clearAllAnimations();
			this.initScreen();
		};
	}

	// Roo Jumping
	fourthAnimation() {
		const screenToLoad = this.$screens[this.currentScreen];
		$(screenToLoad).fadeIn(this.screenLoadInSpeed, () => {
			$('.animationFour').css('display', 'block');

			if (this.bottleSlideRooAnimation.children.length >= 1) {
				this.bottleSlideRooAnimation.restart();
				this.rooJumpingAnimation.restart();
			} else {
				const animation = this.slideBottlesToleft();
				const rooAnimation = this.rooJumpAnimation();
				this.bottleSlideRooAnimation
					.add(animation);
				this.rooJumpingAnimation
					.add(rooAnimation);
			}
			this.rooJumpingAnimation.begin = () => {
				$('.roo').addClass('-play');
			};
		});
	}

	// pauses all animations
	// clears any extras like added classes, etc.
	clearAllAnimations() {
		$(this.animations).each((i, el) => {
			el.pause();
		});

		$('.roo').removeClass('-play');
		$('.screenSelector div').removeClass('-active');
	}

	// handles click events on pre/next buttons
	clickEventHandler() {
		$('.fp-animations .next').click((e) => {
			e.preventDefault();
			this.currentScreen++;
			switch (this.currentScreen - 1) {
			case 0:
				this.firstAnimationFinish();
				break;
			case 1:
				this.secondAnimationFinish();
				break;
			case 2:
				this.thirdAnimationFinish();
				break;
			case 3:
				this.currentScreen = 0;
				this.clearAllAnimations();
				this.initScreen();
				break;
			default:
				console.log('Error in loading next animation');
			}
		});

		$('.fp-animations .prev').click((e) => {
			e.preventDefault();
			this.currentScreen--;

			if (this.currentScreen < 0) this.currentScreen = 3;
			this.clearAllAnimations();
			this.initScreen();
		});

		this.screenHandler();
	}

	// Click events for navigation screen buttons
	screenHandler() {
		$('.screenSelector .screenOne').click((e) => {
			e.preventDefault();
			this.currentScreen = 0;
			this.clearAllAnimations();
			this.initScreen();
		});
		$('.screenSelector .screenTwo').click((e) => {
			e.preventDefault();
			this.currentScreen = 1;
			this.clearAllAnimations();
			this.initScreen();
		});
		$('.screenSelector .screenThree').click((e) => {
			e.preventDefault();
			this.currentScreen = 2;
			this.clearAllAnimations();
			this.initScreen();
		});
		$('.screenSelector .screenFour').click((e) => {
			e.preventDefault();
			this.currentScreen = 3;
			this.clearAllAnimations();
			this.initScreen();
		});
	}

	// Actual Animations
	// slide in targets from right of screen and set opacity to 1
	slideInFromRight($target) {
		const animation = {
			targets: $target,
			left: 0,
			delay: (el, i) => {
				return i * this.slideInOutSpeed;
			},
			opacity: () => {
				return 1;
			},
			easing: 'easeInOutQuart',
			loop: false,
			autoplay: true
		};
		return animation;
	}

	// slide out targets to left and set opacity to 0
	slideOutToLeft($target) {
		const animation = {
			targets: $target,
			left: -1000,
			direction: 'normal',
			delay: (el, i) => {
				return i * this.slideInOutSpeed;
			},
			opacity: () => {
				return 0;
			},
			easing: 'easeInOutQuart',
			loop: false,
			autoplay: false
		};
		return animation;
	}

	// Slide bottle downwards
	slideDown($target) {
		const targetHeight = $($target).height();
		const animation = {
			targets: $target,
			top: targetHeight * 1.5,
			direction: 'normal',
			easing: 'easeInOutQuart',
			duration: 800,
			loop: false,
			autoplay: false
		};
		return animation;
	}

	// Slide down blah bottles and slide up new bottle
	slideDownBlahSlideUpMiddle($target) {
		const targetHeight = $($target).height();
		let slideAmount = targetHeight;
		const animation = {
			targets: $target,
			delay: (el, i) => {
				if (i === 3) {
					slideAmount = targetHeight;
				} else {
					slideAmount = targetHeight * 3;
				}
				return slideAmount;
			},
			top: (el, i) => {
				if (i === 3) {
					slideAmount = 0;
				} else {
					slideAmount = targetHeight * 1.5;
				}
				return slideAmount;
			},
			duration: 1000,
			direction: 'normal',
			easing: 'easeInOutBack',
			loop: false,
			autoplay: false
		};
		return animation;
	}

	// Exlopsion Animation
	animateExplosion() {
		const numberOfParticles = 300;
		const maxParticleSize = 30;
		const particleColors = ['#00BEB0', '#CC587B', '#E30066', '#FBF38C', '#FFC500', '#EED900'];
		for (let i = 0; i <= numberOfParticles; i++) {
			$('.animationTwo').append(
				$('<div/>').css('background-color', particleColors[anime.random(0, particleColors.length - 1)]).addClass('particle')
			);
		}
		const animation = {
			targets: '.particle',
			translateX: (el) => {
				return anime.random(-400, 400);
			},
			translateY: (el) => {
				const randomY = anime.random(-400, 0);
				return randomY;
			},
			easing: 'easeOutExpo',
			duration: 1500,
			opacity: [
				{ value: 1, duration: 700 },
				{ value: 0, duration: 800 }
			],
			scale: () => {
				const random1 = anime.random(2, maxParticleSize / 2);
				const random2 = anime.random(2, maxParticleSize / 2);
				const averageRandom = random1 + random2;
				return ([averageRandom, 0]);
			},
			loop: false
		};
		return animation;
	}

	// Hearts animation
	animateHearts() {
		const paths = [];
		const flutterDuration = 100;
		let mobileOrDesktop = '-desktop';
		let heartMaxSize = 20;
		if ($(window).width() < 769) {
			mobileOrDesktop = '-mobile';
			heartMaxSize = 10;
		}

		$(`.heart-svg.${mobileOrDesktop} path`).map((i, el) => {
			const path = anime.path(el);
			paths.push(path);
		});

		// Slides heart along svg path and sets scale and rotation
		const animation = {
			targets: '.heart',
			translateX: (el, i) => {
				const path = paths[i];
				return path('x');
			},
			translateY: (el, i) => {
				const path = paths[i];
				return path('y');
			},
			opacity: [
				{ value: 1, duration: 800 },
				{ value: 0.4, duration: flutterDuration },
				{ value: 1, duration: flutterDuration },
				{ value: 0.4, duration: flutterDuration },
				{ value: 1, duration: flutterDuration },
				{ value: 0.4, duration: flutterDuration },
				{ value: 1, duration: flutterDuration },
				{ value: 0.4, duration: flutterDuration },
				{ value: 1, duration: flutterDuration }
			],
			easing: () => {
				const easing = this.easings[anime.random(0, 5)];
				return easing;
			},
			rotate: (el) => {
				let direction = 0;
				if ($(el).hasClass('-left')) {
					direction = -90;
				} else if ($(el).hasClass('-right')) {
					direction = 90;
				}
				return ([direction, 0]);
			},
			rotateY: [
				{ value: '90deg', duration: 200 },
				{ value: '0deg', duration: 600 },
			],
			duration: 1000,
			scale: () => {
				return [anime.random(4, heartMaxSize) / 10];
			},
			loop: false
		};
		return animation;
	}

	// Animation that shoots hearts outwards and sets opacity to 0
	shootHearts() {
		const animation = [
			{
				targets: '.heart',
				translateX: (el) => {
					return ($(el).hasClass('-left')) ? -2000 : 2000;
				},
				translateY: (el) => {
					return [anime.random(-2000, 2000)];
				},
				opacity: () => {
					return 0;
				},
				duration: 1500,
				autoplay: false,
				easing: (el) => {
					const easing = this.easings[anime.random(0, 5)];
					return easing;
				}
			}
		];
		return animation;
	}

	// renders # of hearts to dom based on this.numberOfHearts
	renderHeartsToDom() {
		if (!$('.heart').length) {
			for (let i = 0; i < this.numberOfHearts; i++) {
				let direction = '-right';
				if (i <= 27) direction = '-left';
				const $heart = this.createHeart(direction);
				$('.animationThree').append($heart);
			}
		}
	}

	// Heard markup creator
	createHeart(direction) {
		const heart = `<div class="heart ${direction}"></div>`;
		return heart;
	}

	// Fourth animation (jumping roo), slides all bottles on screen a little to the left
	// bottleWidth is set by the width of the div + margin right
	slideBottlesToleft() {
		const bottleWidth = -165; // Bottle width + margin
		const numOfBottles = 8;
		const animation = [];

		for (let j = 1; j <= numOfBottles; j++) {
			animation.push(
				{
					targets: this.$fourthAnimationTarget,
					translateX: (el, i) => {
						return bottleWidth * j;
					},
					easing: 'easeOutSine',
					duration: 1000,
				}
			);
		}

		return animation;
	}

	// Animation for roo vertical jumping
	rooJumpAnimation() {
		const animation = {
			targets: '.roo',
			translateY: [
				{ value: -60, duration: 300, delay: 0 },
				{ value: 0, duration: 700, delay: 0 }
			],
			loop: true,
			easing: 'easeInOutQuart'
		};
		return animation;
	}
}

/* jshint ignore:end */
