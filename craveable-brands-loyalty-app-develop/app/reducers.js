import { combineReducers } from 'redux';
// import { firebaseStateReducer as firebase } from 'react-redux-firebase';
// import { firestoreReducer as firestore } from 'redux-firestore';

/* reducer-import */
import { SignUpReducer } from './components/signup/SignUpReducer';
import { OfferDetailReducer } from './components/offerdetail/OfferDetailReducer';
import { MoreReducer } from './components/more/MoreReducer';
import { HelpReducer } from './components/help/HelpReducer';
import { OffersReducer } from './components/offers/OffersReducer';
import { ProfileReducer } from './components/profile/ProfileReducer';
import { HomeReducer } from './components/home/HomeReducer';
import { LoyaltyCardReducer } from './components/loyaltycardContainer/LoyaltyCardReducer';
import { FirebaseReducer } from 'app/reducers/firebase';
import { StoresReducer } from 'app/reducers/stores';
import { LoginReducer } from 'app/reducers/login';
/* navigation-reducers */
import MainNav from './router/main/MainNavigation';
import AppNav from './router/appnav/AppNavigation';
import { TabBarReducer } from './router/tabbar/TabBarReducer';
import { MainNavReducer } from './router/main/MainNavReducer';
import { AppNavReducer } from './router/appnav/AppNavReducer';

export default combineReducers({
	/* reducer-name */
	SignUpReducer,
	OfferDetailReducer,
	OffersReducer,
	ProfileReducer,
	HomeReducer,
	FirebaseReducer,
	StoresReducer,
	LoyaltyCardReducer,
	LoginReducer,
	appNav: AppNavReducer,
	mainNav: (state,action) => MainNav.router.getStateForAction(action,state)
});
