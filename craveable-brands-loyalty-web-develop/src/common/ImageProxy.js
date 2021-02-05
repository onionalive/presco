/**
 * Importing for React Native might become a problem for if we are ussing
 * this for the React module as well 
 */
import { PixelRatio, Dimensions } from 'react-native';
import ImgixClient from 'imgix-core-js';
import Config from 'craveable-brands-loyalty-app/app.config';

export default class ImageProxy {

	constructor() {
		this.imgix = new ImgixClient({
			host: Config.imgix.host,
			secureURLToken: Config.imgix.secureURLToken,
		});

		this.pixelRatio = PixelRatio.get();
		this.deviceDimensions = Dimensions.get('window');
	}

	/**
	 * Get an Imgix URL for a processed image
	 * 
	 * @param {string} src Src URL of original image
	 * @param {float} width Percentage of screen width image should be displayed at (between 0 and 1)
	 * @param {float} ratio The ratio the image should be cropped to. Leave blank to scale height automatically.
	 * @return {object}      Return image source
	 * @memberof Image
	 */
	get(src, width, ratio = null) {
		let options = {
			fm: 'jpg',
			q: 70,
			w: Math.floor(width * this.deviceDimensions.width * this.pixelRatio)
		}

		if (ratio) {
			options.h = Math.floor(options.w / ratio);
			options.fit = 'crop';
		}

		return this.imgix.buildURL(src, options);
	}
}
