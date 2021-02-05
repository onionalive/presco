/* global ga: true */

export default class Analytics {

	track(category, action, label, nonInteraction = true) {
		try {
			ga('send', 'event', category, action, label, {
				nonInteraction
			});
		} catch (error) {
			console.log(`[EXCEPTION] Analytics blocked by user-agent (${error.message})`);
			return false;
		}

		return true;
	}
}
