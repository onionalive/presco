// note that the react-native specific code might
// become a problem for using the common file for the
// web app as well
import firebase from 'react-native-firebase';
import { store } from 'app/app';
import { updateSelectedItem } from 'app/components/offers/OffersReducer';

const SELECTED_ITEM 			= 'OffersReducer/SELECTED_ITEM';
const UPDATE_NOTIFICATION_BOTTOM = 'OnboardingReducer/UPDATE_NOTIFICATION_BOTTOM';

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
	static initDeepLinks(navigation, dispatch) {
        console.log('NAVIGATION', navigation);
        /**
         * Filter parameters from the query URL
         * We are expecting the deep link to look
         * like: https://www.oporto.com.au/?route=<route>&key=<key>
         * @param {*} query 
         */
        const getParams = query => {
            if (!query) {
                return { };
            }

            const splitURL = (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('?')
                .filter((d, i) => i > 0);
          
            return splitURL[0]
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

        firebase.links().onLink(async (url) => {
            try {
                const state = store.getState();
                if (__DEV__) {
                    console.log('### DEEP LINK RECIEVED', url);
                    console.log('DeepLinks state:', state);
                }

                const isLoggedIn = state.LoginReducer.isLoggedIn;
                const params = getParams(url);

                const route = params.route.replace(/\b\w/g, l => l.toUpperCase());
                if (__DEV__) {
                    console.log('Deep link params:', params);
                    console.log('Deep link route:', route);
                }

                switch (route) {
                    case 'Offers':
                        const offerList = state.OffersReducer.offersActive.concat(state.OffersReducer.offersExpired);
                        const selectedItem = offerList.filter(d => d.id == params.key);
                        
                        if (__DEV__) {
                            console.log('Offer List', offerList);
                            console.log('Selected Item', selectedItem);
                        }

                        if (selectedItem.length > 0) {
                            if (__DEV__) console.log('Deep link Key matches an offer.');

                            dispatch({
                                type: SELECTED_ITEM,
                                value: {
                                    ...selectedItem[0],
                                    image: 'https://firebasestorage.googleapis.com/v0/b/cb-loyalty-oporto.appspot.com/o/promotions%2Fimages%2FOG_Bondi_bg.1.jpg?alt=media&token=354ba052-6a4b-4934-86d2-e35d3fd0b2f2',
                                    type: 'offer'
                                }
                            });

                            await navigation.navigate('ModalNav');
                        } else {
                            if (__DEV__) console.log('Deep link Key does not match list of offers.');

                            const notif = {
                              title: 'Not found',
                              subtitle: 'We could not find that particular offer. Browse what other offers are available!',
                              buttons: [
                                  { 
                                      title: 'Dismiss',
                                      action: null
                                  }
                              ],
                              footer: '',
                              view: 'ONE'
                            };

                            dispatch({
                                type: UPDATE_NOTIFICATION_BOTTOM,
                                value: notif,
                                showNotification: true
                            });
                        
                            await navigation.navigate(route);
                        }
                        return;
                    case 'Promotions':
                        console.log('Promos hit');
                        navigation.navigate(route);
                        return;
                    default:
                        navigation.navigate(route);
                        return;
                } 
            } catch(err) {
                if (__DEV__) console.log('Deep Link errored', err);
            }
        });	
    }
}