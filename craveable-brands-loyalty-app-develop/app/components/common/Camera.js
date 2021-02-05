'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';

var QRCodeScreen = require('./QRCodeScreen');

class cameraApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Index',
          backButtonTitle: 'Back',
          component: Index,
        }}
      />
    );
  }
}

class Index extends Component {
  render() {
	  // console.log('INDEX', this.props);
    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => this._onPressQRCode()}>
          <Text>Read QRCode</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPressQRCode() {
    this.props.navigator.push({
      component: QRCodeScreen,
      title: 'QRCode',
      passProps: {
		onSuccess: this._onSuccess
      },
    });
  }

  _onSuccess(result) {
    console.log(result);
  }
}

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default cameraApp;