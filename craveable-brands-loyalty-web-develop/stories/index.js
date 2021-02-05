import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Home from 'components/home/Home';

// Redux requirements
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers/reducer';
import ReduxThunk from 'redux-thunk';
import 'main.css';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Home', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('full home component', () => <Home />);

