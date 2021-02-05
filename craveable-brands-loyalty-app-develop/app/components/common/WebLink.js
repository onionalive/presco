import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { WebView, Linking } from 'react-native';
import axios from 'axios';

/* user imports */

class WebLink extends Component {
	render() {
		try {c
			return (
				<WebView
				ref={(ref) => { this.webview = ref; }}
				source={{ uri }}
				onNavigationStateChange={(event) => {
					if (event.url !== uri) {
						this.webview.stopLoading();
						Linking.openURL(event.url)
						.catch(err => console.log('An error occurred', err));
					}
				}}
			  />
			);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default WebLink;
