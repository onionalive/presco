import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './Footer';

export default (props) => {
	return (
		<div className='container'>
			<Header />
			<main id='main-content'>
				{props.children}
			</main>
			<Footer />
		</div>
	);
};
