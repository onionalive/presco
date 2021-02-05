import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers/reducer';
import ReduxThunk from 'redux-thunk';
import Home from 'components/home/Home';
import Offers from 'components/offers/Offers';
import OfferSingle from 'components/offerssingle/OfferSingle';
import Promos from 'components/promos/Promos';
import PromoSingle from 'components/promosingle/PromoSingle';
import Items from 'components/common/GridView';
import ItemDetails from 'components/common/TileDetailView';
import Signup from 'components/signup/SignupView';
import Signin from 'components/signin/Signin';
import Transactions from 'components/transactions/Transactions';
import Profile from 'components/profile/Profile';
import Login from 'components/loginscreen/LoginScreenView';
import 'main.css';

const store = createStore(
	reducers,
	 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	 applyMiddleware(ReduxThunk));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Home} />
			<Route path="/promotions" component={Promos} />
			<Route path="/promotion/:slug" component={PromoSingle} />
			<Route path="/offers" component={Offers} />
			<Route path="/offer/:slug" component={OfferSingle} />
			<Route path="/signup" component={Signup} />
			<Route path="/signin" component={Signin} />
			<Route path="/transactions" component={Transactions} />
			<Route path="/profile" component={Profile} />
			<Route path="/account-settings" component={Profile} />
			<Route path="/login" component={Login} />
		</Router>
	</Provider>
	, document.getElementById('root')
);