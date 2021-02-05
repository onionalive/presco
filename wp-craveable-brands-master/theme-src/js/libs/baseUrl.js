export const BaseUrl = () => {
	if (window.location.href.includes('localhost')) {
		return '/wp-craveable-brands';
	} else {
		const url = window.location.href;
		const urlSplit = url.split('/')
		return `${urlSplit[0]}//${urlSplit[2]}`
	}
}