/**
 * Export component styles
 */
import Colours from 'app/styles/Colours';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

// const model = DeviceInfo.getModel();
const model = IPHONE_5;

const IPHONE_5 = 'iPhone 5';
const IPHONE_X = 'iPhone X';

let padding;
switch(model) {
	case IPHONE_X:
		padding = 40;
		break;
	default:
		padding = 20;
		break;
}

export const Styles = {
	container: {
		backgroundColor: Colours.cWhite
	},
	scrollView: {
		backgroundColor: Colours.cOffBlack
	}
};