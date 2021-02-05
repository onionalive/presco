// note that the react-native specific code might
// become a problem for using the common file for the
// web app as well
import firebase from 'react-native-firebase';

/**
 * @class DynamicLinks
 * 
 * @description 
 * Use this class in order to parse and 
 * show the correct display in the app/web
 * accordingly.
 */
export default class DynamicLinks {
	/**
	 * Set user details in Firebase
	 * 
	 * @static
	 * @memberof DynamicLinks
	 */
	static initDeepLinks() {
        const getParams = query => {
            if (!query) {
                return { };
            }
          
            return (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params, param) => {
                    let [ key, value ] = param.split('=');
                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                    return params;
                }, { });
        };

        firebase.links()
            .getInitialLink()
            .then((url) => {
                if (url) {
                    // app opened from a url
                    console.log(url);
                } else {
                    // app NOT opened from a url
                    console.log('APP NOT OPENED FROM DEEP LINK URL');
                }
            });

        firebase.links().onLink((url) => {
            console.log('### DEEP LINK RECIEVED', url);
            const params = getParams(url);
            console.log('### THE PARAMS', params);
        });	
    }
}