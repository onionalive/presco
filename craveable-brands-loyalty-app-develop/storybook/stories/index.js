/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../../app/components/common/Button';
import ProgressBar from '../../app/components/common/ProgressBar';
import Accordian from '../../app/components/common/Accordian';
import InputField from '../../app/components/common/InputField';
import InputSingleField from '../../app/components/common/InputSingleField';
import Notification from '../../app/components/common/Notification';
import NotificationBottom from '../../app/components/common/NotificationBottom';
import CenterView from './CenterView';
import Welcome from './Welcome';
import Home from '../../app/components/home/Home';
import SwiperContainer from '../../app/components/swipercontainer/SwiperContainer';
import AccountSettings from '../../app/components/accountsettings/AccountSettings';
import Landscape from '../../app/components/landscape/Landscape';

// Redux requirements
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../../app/reducers';
import ReduxThunk from 'redux-thunk';
import Router from '../../app/router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

/**
 * Important to note:
 * Since we are using Redux, ensure that you use the ".addDecorator" function
 * to ensure that the component is wrapped by the Redux Store to work correctly.
 * @author Dennis O'Keeffe
 */

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Accordian', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('accordian collection', () => <View style={{flex: 1, paddingTop: 300, backgroundColor: 'gray' }}>
										<Accordian offer={true} />
										<Accordian />
									</View>);

storiesOf('ProgressBar', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('basic progress bar', () => <View style={{flex: 1, paddingTop: 300, backgroundColor: 'gray' }}>
										<ProgressBar progress={0.6} />
									</View>);

storiesOf('Notifications', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('notification top', () => <View style={{width: '100%', height: '100%', backgroundColor: 'gray' }}>
										<Notification />
									</View>)
	.add('notification bottom', () => <View style={{width: '100%', height: '100%', backgroundColor: 'gray' }}>
										<NotificationBottom />
									</View>);


storiesOf('Landscape Mode', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('landscape', () => <View style={{width: '100%', height: '100%', backgroundColor: 'black' }}>
										<Landscape />
									</View>);

storiesOf('Account Settings', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('landscape', () => <View style={{width: '100%', height: '100%', backgroundColor: 'black' }}>
										<AccountSettings />
									</View>);

storiesOf('Text Input', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('basic', () => <View style={{width: '100%', height: '100%', backgroundColor: 'gray', padding: 20 }}>
										<InputField
											title='title can go here'
											placeholder='first name' />
										<InputField placeholder='last name'/>
										<InputField placeholder='address bitch'
											error='error can go here'
											/>
									</View>)
	.add('mobile', () => <View style={{width: '100%', height: '100%', backgroundColor: 'gray', padding: 20 }}>
										<InputSingleField />
									</View>);

storiesOf('Button', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('basic button', () => <View>
									<Button
										action={action('cta-tapped')}
										underlayColor='rgba(255,255,255,0.8)'
									>
										<View style={{ height: 100, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}>
											<Text>Button</Text>
										</View>
									</Button>
								</View>);

storiesOf('Home', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('full home component', () => <Home />);

storiesOf('Swiper Container', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('swiper container', () => <SwiperContainer type='promo' />);
