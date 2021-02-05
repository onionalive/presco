const expect = require('chai').expect;
const Slack = require('../controllers/slack');

// Helper vars
const user = { id: 'U1ULLG51D',
	team_id: 'T026J7JR3',
	name: 'dennis_okeeffe',
	deleted: false,
	color: '50a0cf',
	real_name: 'Dennito Burrito',
	tz: 'Australia/Canberra',
	tz_label: 'Australian Eastern Standard Time',
	tz_offset: 36000,
	profile:
	{
		first_name: 'Dennito',
		last_name: 'Burrito',
		avatar_hash: '399b6072e5f5',
		image_24: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_24.jpg',
		image_32: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_32.jpg',
		image_48: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_48.jpg',
		image_72: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_72.jpg',
		image_192: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_192.jpg',
		image_512: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_512.jpg',
		image_1024: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_1024.jpg',
		image_original: 'https://avatars.slack-edge.com/2017-05-03/177327899089_399b6072e5f558b89b85_original.jpg',
		title: 'Swoon',
		status_text: 'Euphoric',
		status_emoji: ':miltonmango:',
		real_name: 'Dennito Burrito',
		real_name_normalized: 'Dennito Burrito',
		email: 'dennis@presentcompany.co'
	},
	is_admin: false,
	is_owner: false,
	is_primary_owner: false,
	is_restricted: false,
	is_ultra_restricted: false,
	is_bot: false,
	updated: 1493875417
};

// Actions
const CREATE = 'action/CREATE';

// Test suite
describe('Mocha', () => {
	// Test spec (unit test)
	describe('Inital test to be ok', () => {
		it('should run our test using npm', () => {
			expect(true).to.be.ok;
		});
	});
});

const action = {
	id: 'user.id',
	team_id: 'user.team_id',
	real_name: 'user.real_name',
	message: 'message',
	action: 'action'
};

// Test suite
describe('controllers/slack.js', () => {
	it('append(): should add incoming data to the history array', () => {
		const userHistory = Slack.checkHistory(user.id);
		const history = Slack.append(user, action);
		expect(history.length).to.equal(1);
	});

	describe('checkHistory(): should be able to check the history of the conversation', () => {
		it('function should be okay', () => {
			expect(Slack.checkHistory(user.id)).to.be.ok;
		});
		it('should be able to return the CONFIRMATION event from history', () => {
			const userHistory = Slack.checkHistory(user.id);
			const history = Slack.append(user, action);
			const conversation = Slack.checkHistory(user.id);
			expect(conversation.length).to.equal(2);
			expect(conversation[conversation.length - 1].event === CREATE);
			expect(conversation[conversation.length - 1].id === user.id);
		});
	});

	it('should have a default response');
});
