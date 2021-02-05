import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Header from '../src/components/header/Header';
import Footer from '../src/components/footer/Footer';

import Documentation from '../src/components/documentation/Documentation';
import DocumentationHowTo from '../src/components/documentationhowto/DocumentationHowTo';
import Button from '../src/components/button/Button';
import Option from '../src/components/option/Option';
import OptionDocumentation from '../src/components/optiondocumentation/OptionDocumentation';
import Input from '../src/components/input/Input';
import InputCollection from '../src/components/inputcollection/InputCollection';
import Table from '../src/components/table/Table';
import Dropdown from '../src/components/dropdown/Dropdown';
import DropdownDocumentation from '../src/components/dropdowndocumentation/DropdownDocumentation';

import BreadcrumbsDocumentation from '../src/components/breadcrumbsdocumentation/BreadcrumbsDocumentation';

// Grids
import Grid from '../src/components/grid/Grid';
import Item from '../src/components/item/Item';
import GridDocumentation from '../src/components/griddocumentation/GridDocumentation';

import Block from '../src/components/block/Block';

import Modal from '../src/components/modal/Modal';

import Loading from '../src/components/loading/Loading';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../src/reducers/reducer';
import ReduxThunk from 'redux-thunk';
import '../src/main.css';
import './storybook.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

storiesOf('Documentation')
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('Adding to the storybook', () => (<DocumentationHowTo></DocumentationHowTo>))
	.add('HTML', () => (<Documentation type="html">
			<p>Use the documentation tag with property type="html"</p>
		</Documentation>))
	.add('React', () => (<Documentation type="react">
			<p>Use the documentation tag with property type="react"</p>
		</Documentation>))
	.add('React Native', () => (<Documentation type="react-native">
			<p>Use the documentation tag with property type="react-native"</p>
		</Documentation>))
	.add('CSS', () => (<Documentation type="scss">
			<p>Use the documentation tag with property type="scss"</p>
		</Documentation>));

storiesOf('Animation and motion', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('Animation speeds', () => (
		<div>
			<div className="container">
				<h2>Transform examples</h2>
				<h2>$a-desktop</h2>
				<Block animation="desktop" />
				<h2>$a-desktop-enter</h2>
				<Block animation="desktop-enter" />
				<h2>$a-desktop-exit</h2>
				<Block animation="desktop-exit" />
				<h2>$a-mobile</h2>
				<Block animation="mobile" />
				<h2>$a-mobile-enter</h2>
				<Block animation="mobile-enter" />
				<h2>$a-mobile-exit</h2>
				<Block animation="mobile-exit" />
			</div>
			<div className="container">
				<h2>Hover state examples</h2>
				<h2>$a-desktop</h2>
				<Block animation="button-desktop" />
				<h2>$a-desktop-enter</h2>
				<Block animation="button-desktop-enter" />
				<h2>$a-desktop-exit</h2>
				<Block animation="button-desktop-exit" />
				<h2>$a-mobile</h2>
				<Block animation="button-mobile" />
				<h2>$a-mobile-enter</h2>
				<Block animation="button-mobile-enter" />
				<h2>$a-mobile-exit</h2>
				<Block animation="button-mobile-exit" />
			</div>
		</div>
	));

storiesOf('Components', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('Button', () => (
		<div>
			<h2>Buttons</h2>
			<Button type="primary">Primary</Button>
			<Button type="secondary">Secondary</Button>
			<Button type="raised">Raised</Button>
			<Button type="floating">Floating</Button>
		</div>
	))
	.add('Breadcrumbs', () => (<BreadcrumbsDocumentation />))
	.add('Checkbox/Radio Buttons', () => <OptionDocumentation />)
	.add('Documentation', () => (<DropdownDocumentation />))
	.add('Footer', () => (<Footer />))
	.add('Grid', () => (<GridDocumentation />))
	.add('Header', () => (<Header />))
	.add('Input', () => (<InputCollection />))
	.add('Loading', () => (<Loading />))
	.add('Modal', () => (<Modal />))
	.add('Table', () => (<Table />));

storiesOf('Iconography', module)
	.addDecorator(story => <Provider store={store}>{story()}</Provider>)
	.add('.i-add', () => (<div className="block bg-grey i-add"></div>))
	.add('.i-caret-down', () => (<div className="block bg-grey i-caret-down"></div>))
	.add('.i-checkmark', () => (<div className="block bg-grey i-checkmark"></div>))
	.add('.i-chevron-right', () => (<div className="block bg-grey i-chevron-right"></div>))
	.add('.i-delete', () => (<div className="block bg-grey i-delete"></div>));
