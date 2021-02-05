const Cookies = require('js-cookie');

class Display {
	constructor() {
		this.airtableData = [];
		this.$ideaContainer = $('.idea-container');
		this.$idea = $('.idea');
		this.ideaIdenity = 0;
		this.page = 0;

		// Can bring the below back in if required. I commented out so we're all looking at the same data.

		// if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
		// 	this.baseUrl = window.location.href;
		// } else {
			this.baseUrl = 'http://api.boffins.prescoapps.co/';
		// }
	}

	init() {
		this.getAirtableData();
		this.loadMore();
		this.clickHandler();
	}

	getAirtableData() {
		$.ajax({
			type: 'GET',
			url: `${this.baseUrl}api/page/${this.page}`,
			success: (res) => {
				if (res <= 0) {
					$('.load-more').fadeOut();
				} else {
					res.forEach((el) => {
						this.airtableData.push(el);
					});
					this.appendIdeasToPage();
				}
			},
			error: (res) => {
				console.log(`error ${res}`);
			}
		});
	}

	appendIdeasToPage() {
		let index = (this.page * 10);
		while (index < ((this.page + 1) * 10)) {

			const elem = this.airtableData[index];
			const idea = this.setupIdea(index, elem);
			this.$ideaContainer.append(idea);
			index++;
		}
		this.showAlreadyVoted();
	}

	setupIdea(i, elem) {
		i++;

		let title = elem.title;
		if (title.indexOf('http://') > 0) {
			title = title.substring((title.indexOf('|') + 1), (title.length - 1));
		}

		const idea = `
			<div class='idea'>
				<h1 class='number'>${i}.</h1>
				<p class='upvote' id='${elem.record.id}' data-upvotes='${elem.upVotes}'>^</p>
				<div class='idea-information'>
					<p class='votes'>${elem.totalVotes} Votes</p>
					<h2 class="idea-title">${title}</h2>
					<span class='author'>${elem.owner}</span>
				</div>
				<p class='arrow' data-id='${i}'>-></p>
			</div>`;

		return $(idea);
	}

	setupSingleIdea(elem) {
		const idea = `
			<div class='close'>X</div>
			<div class='idea'>
				<i class='fa fa-arrow-up' aria-hidden='true' id='${elem.title}'></i>
				<div class='idea-information'>
					<p class='votes'>${elem.totalVotes} Votes</p>
					<h2 class='idea-title'>${elem.title}</h2>
					<span class='author'>${elem.owner}</span>
				</div>
				<p class='description'>${elem.description}</p>
			</div>`;

		return $(idea);
	}

	loadMore() {
		$('.load-more').click((e) => {
			e.preventDefault();
			this.page += 1;

			this.getAirtableData();
		});
	}

	clickHandler() {
		$(document).on('click', '.arrow', (el) => {
			this.ideaIdenity = $(el.target).data('id') - 1;
			let idea = this.airtableData[this.ideaIdenity];
			console.log(idea);
			idea = this.setupSingleIdea(idea);
			$('.idea-container').fadeOut();
			$('.load-more').fadeOut();
			$('.single-idea').append(idea);
			$('.single-idea').fadeIn();
		});
		$(document).on('click', '.close', () => {
			$('.single-idea').empty();
			$('.single-idea').fadeOut();
			$('.idea-container').fadeIn();
			$('.load-more').fadeIn();
		});
	}

	showAlreadyVoted() {
	 const cookies = Cookies.get();
	 for ( const cookie in cookies ) {
		 console.log(cookie);
		 $(`#${cookie}`).addClass(`-active`);
	 }
	}
}

export default Display;
