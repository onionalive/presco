const Cookies = require('js-cookie');
const axios = require('axios');

class Cookie {
	constructor() {
		this.currentUpVotes = 0;
	}

	init() {
		this.clickHandler();
	}

	clickHandler() {
		$(document).on('click', '.upvote', (e) => {
			e.preventDefault();
			$(e.target).addClass('-active');
			this.currentUpVotes = e.target.getAttribute('data-upvotes');
			this.handleVoting(e.target.id);
		});
	}

	handleVoting(target) {
		const alreadyVoted = this.testIfalreadyVoted(target);
		if (!alreadyVoted) {
			this.upVoteIdea(target);
		} else {
			console.log(Cookies.get());
		}
	}

	testIfalreadyVoted(target) {
		let alreadyVoted = false;
		const cookie = Cookies.get(target);

		if (cookie) {
			alreadyVoted = true;
		}

		return alreadyVoted;
	}

	upVoteIdea(target) {
		let URL;
		if (window.location.href.includes('localhost')) {
			URL = '/boffins/upvote';
		} else {
			URL = `http://api.boffins.prescoapps.co/boffins/upvote`;
		}

		Cookies.set(target, true);
		const newUpVoteTotal = parseInt(this.currentUpVotes) + 1;
		$(`#${target}`).next().children('.votes').html(`${newUpVoteTotal} Votes`);

		axios.post(URL, {
			id: target,
			votes: newUpVoteTotal,
		}).then((res) => {
			console.log('woop woop');
			console.log(res);
		});
	}
}

export default Cookie;
