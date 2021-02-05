export function getParameterByName(name, url = window.location.href) {
	const nameReplace = name.replace(/[\]]/g, '\\$&');
	const regex = new RegExp(`[?&]${nameReplace}(=([^&#]*)|&|#|$)`);
	const	results = regex.exec(url);

	if (!results) {
		return null;
	}

	if (!results[2]) {
		return '';
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
