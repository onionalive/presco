import { combineReducers } from 'redux';
import { HeaderReducer } from './components/header/HeaderReducer';
import { HomeReducer } from './containers/home/HomeReducer';
import { ResponsibilitiesReducer } from './containers/responsibilities/ResponsibilitiesReducer';
import { CareersReducer } from './containers/careers/CareersReducer';
import { CareersSingleReducer } from './containers/careers-single/CareersSingleReducer';
import { BrandSingleReducer } from './containers/brand-single/BrandSingleReducer';
import { BrandReducer } from './containers/brand/BrandReducer';
import { LeadersSingleReducer } from './containers/leaders-single/LeadersSingleReducer';
import { OurLeadersReducer } from './containers/leaders/OurLeadersReducer';
import { ResponsibilitiesSingleReducer } from './containers/responsibilities-single/ResponsibilitiesSingleReducer';

export default combineReducers({
	headerReducer: HeaderReducer,
	homeReducer: HomeReducer,
	leadersSingleReducer: LeadersSingleReducer,
	responsibilitiesReducer: ResponsibilitiesReducer,
	brandSingleReducer: BrandSingleReducer,
	brandReducer: BrandReducer,
	careersReducer: CareersReducer,
	careersSingleReducer: CareersSingleReducer,
	ourLeadersReducer: OurLeadersReducer,
	responsibilitiesSingleReducer: ResponsibilitiesSingleReducer,
});
