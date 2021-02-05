import React from 'react';
import { StatusBar, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

import immutableTransform from 'redux-persist-transform-immutable';
import Router, { SCREENS } from './router';
import Colours from 'app/styles/Colours';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import createSensitiveStorage from "redux-persist-sensitive-storage";
import Config from '../app.config.js';
import Analytics from 'app/common/Analytics';
import { loginLoad } from 'app/reducers/login';

import {
	createReduxBoundAddListener,
	createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import firebase from 'react-native-firebase';
import Firestore from './common/Firestore.js';
import MarketingCloud from './common/MarketingCloud.js';
import Bluedot from './common/Bluedot.js';

const config = {
	key: 'primary',
	storage,
	whitelist: ['ProfileReducer', 'OffersReducer', 'StoresReducer', 'LoyaltyCardReducer']
}
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const reducer = persistReducer(config, reducers);

// Add in later 
const analyticsMiddleware = store => next => action => {
	const NAVIGATE = 'Navigation/NAVIGATE';

	switch(action.type) {
		case NAVIGATE:
			const routeTriggered = action.routeName;

			// if route is a screen
			if (SCREENS.includes(routeTriggered)) {
				Analytics.setCurrentScreen('Main TabBar', routeTriggered);
				console.log('@@@ ROUTE', routeTriggered);
			}
			
			next(action);
			break;
		default:
			next(action);
			break;
	}
}

let navLocked = false;
let lastActionType = null;

const navigationDebouncer = store => next => action => {
	const interval = 270;
	if (action.type.split('/')[0] === 'Navigation') {
		if (action.type !== 'Navigation/SET_PARAMS') {
			if (navLocked && action.type === lastActionType) {
				return;
			} else {
				setTimeout(function () {
					return navLocked = false;
				}, interval);
				navLocked = true;
				lastActionType = action.type;
			}
			next(action);
		}
	} else {
		next(action);
	}
};

/**
 * Listeners for React Navigation
 */
const appNavMiddleware = createReactNavigationReduxMiddleware(
	"app",
	state => state.appNav
);

const mainNavMiddleware = createReactNavigationReduxMiddleware(
	"main",
	state => state.mainNav
);

export const addAppNavListener = createReduxBoundAddListener("app");
export const addMainListener = createReduxBoundAddListener("main");

enhancers.push(applyMiddleware(
	ReduxThunk,
	navigationDebouncer,
	analyticsMiddleware,
	appNavMiddleware,
	// mainNavMiddleware
));

export const store = createStore(
	reducer,
	composeEnhancers(...enhancers)
	// compose(
	// 	applyMiddleware(ReduxThunk),
	// 	reactReduxFirebase(Config.firebaseConfig, {
	//         enableLogging: false,
	//         ReactNative: { AsyncStorage },
	//     }),
	//     reduxFirestore(firebase.firestore(), {
	//         ReactNative: { AsyncStorage },
	//     })
	//    )
);

// export const storeBase = createStore(reducers, {},
// 	compose(
// 		applyMiddleware(ReduxThunk),
// 		reactReduxFirebase(Config.firebaseConfig, {
// 			userProfile: 'users',
// 			enableLogging: false,
// 			ReactNative: { AsyncStorage },
// 		}),
// 	)
// );
// export const store = storeBase(reducer, {}, storeBase);

		// Watch Firestore for changes

const configureBluedot = () => {
	const bluedot = new Bluedot();
}

const configureFirebase = (dispatch) => {
	// Sign in anonymously
	firebase.auth().signInAnonymously();
	// Watch Firestore for changes
	const firestore = new Firestore(dispatch);
}

const configureMarketingCloud = () => {
	const marketingCloud = new MarketingCloud;
	marketingCloud.init();
}



const persistDone = async (store) => {
	try {
		// console.log(store)
		await configureBluedot();
		await configureMarketingCloud();
		await configureFirebase(store.dispatch);
	} catch (err) {
		console.log(err);
	}
	await loginLoad(store);
}

export const persistor = persistStore(store, createSensitiveStorage(), () => persistDone(store));

// persistStore(
// 	store,
// 	null,
// 	() => {
// 		store.getState() // if you want to get restoredState
// 	}
// );

/**
 * Import the routes from router/, wrap
 * in the Redux Store and then export the app
 * out to the entry files for each iOS and
 * Android app.
 *
 * The Redux Provider sits at the top, with
 * another HOC in the PersistGate being
 * required for the secure storage
 * of particular fields.
 *
 * For react-redux, refer to https://github.com/reactjs/react-redux
 * For the PersistGate, refer to https://github.com/CodingZeal/redux-persist-sensitive-storage
 * https://github.com/mCodex/react-native-sensitive-info and
 * https://github.com/rt2zz/redux-persist
 */
const App = () => {
	return (
		<Provider store={store}>
			<PersistGate
				persistor={persistor}>
				<Router />
			</PersistGate>
		</Provider>
	);
}

export default App;
