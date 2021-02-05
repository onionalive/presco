import config from 'craveable-brands-loyalty-app/app.config';

/**
 * Oporto Colours
 */
const cOportoOrange = '#FD754D';
const cOportoOrangeRgba = 'rgba(253,117,77,1)';
const oporto = {
	cPrimary: cOportoOrange,
	cPrimaryUnderlay: cOportoOrangeRgba
}

/**
 * Red Rooster Colours
 */
const cRedRoosterRed = '#B91432';

const redrooster = {
	cPrimary: cRedRoosterRed
}

let theme;
switch(config.theme) {
	case 'oporto':
		theme = oporto;
		break;
	case 'redrooster':
		theme = redrooster;
		break;
	default:
		throw new Error('Failed to get the theme. Please ensure you run the correct npm script for the theme.');
}

export default Colours = {
	cBlack: '#000',
	cNearlyBlack: '#181818',
	cNearlyBlackUnderlay: 'rgba(24, 24, 24, 1)',
	cWhite: '#fff',
	cWhiteUnderlay: 'rgba(255, 255, 255, 1)',
	cGrey: '#8d8d8d',
	cLightGrey: 'rgba(151,151,151,0.2)',
	cOffBlack: '#222',
	cOffBlackUnderlay: 'rgba(34, 34, 34, 1)',
	cOffWhite: '#F4F4F4',
	cGreen: '#27AC8E',
	cGreenUnderlay: 'rgba(39, 172, 142, 1)',
	cYellow: '#FFFC31',
	cRed: '#FF3750',
	cTransparent: 'rgba(0,0,0,0)',
	...theme
};
