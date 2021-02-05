import React from 'react';
import {
	browserHistory,
	IndexRoute,
	Redirect,
	Route,
	Router
} from 'react-router';
import Home from './containers/home/Home';
import Responsibilities from './containers/responsibilities/Responsibilities';
import Careers from './containers/careers/Careers';
import CareersSingle from './containers//careers-single/CareersSingle';
import ResponsibilitiesSingle from './containers/responsibilities-single/ResponsibilitiesSingle';
import OurLeaders from './containers/leaders/OurLeaders';
import LeadersSingle from './containers/leaders-single/LeadersSingle';
import BrandSingle from './containers/brand-single/BrandSingle';
import Brand from './containers/brand/Brand';
import ErrorPage from './containers/error/ErrorView';

export default () => {
	const baseUrl = (window.location.href.includes('localhost')) ? 'wp-craveable-brands' : '';
	const homeUrl = (window.location.href.includes('localhost')) ? 'wp-craveable-brands' : '/';

	return (
		<Router history={browserHistory}>
			<Route path={`${homeUrl}`} component={ Home } >
				<IndexRoute component={ Home } />
			</Route>
			<Route path={`${baseUrl}/responsibilities/`} component={ Responsibilities } >
				<IndexRoute component={ Responsibilities } />
			</Route>
			<Route path={`${baseUrl}/responsibilities/:slug`} component={ ResponsibilitiesSingle } >
				<IndexRoute component={ ResponsibilitiesSingle } />
			</Route>
			<Route path={`${baseUrl}/brand/`} component={ Brand } >
				<IndexRoute component={ Brand } />
			</Route>
			<Route path={`${baseUrl}/brand/:slug`} component={ BrandSingle } >
				<IndexRoute component={ BrandSingle } />
			</Route>
			<Route path={`${baseUrl}/leaders`} component={ OurLeaders } >
				<IndexRoute component={ OurLeaders } />
			</Route>
			<Route path={`${baseUrl}/our-leaders`} component={ OurLeaders } >
				<IndexRoute component={ OurLeaders } />
			</Route>
			<Route path={`${baseUrl}/leaders/:leader`} component={ LeadersSingle } >
				<IndexRoute component={ LeadersSingle } />
			</Route>
			<Route path={`${baseUrl}/careers`} component={ Careers } >
				<IndexRoute component={ Careers } />
			</Route>
			<Route path={`${baseUrl}/careers/:career`} component={ CareersSingle } >
				<IndexRoute component={ CareersSingle } />
			</Route>
			<Route path="*" component={ErrorPage} />
		</Router>
	);
}
