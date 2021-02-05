'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  VibrationIOS,
  Alert
} from 'react-native';
import Camera from 'react-native-camera';

/**
 * All code here is basically a default taken from
 * the example and should be updated at some stage.
 */
class QRCodeScreen extends Component {
	state = {
		flagged: false
	}

//   getDefaultProps() {
//     return {
//       cancelButtonVisible: false,
//       cancelButtonTitle: 'Cancel',
//     };
//   }

  _onPressCancel() {
    var $this = this;
    requestAnimationFrame(function() {
      $this.props.navigator.pop();
      if ($this.props.onCancel) {
        $this.props.onCancel();
      }
    });
  }

  _onBarCodeRead = (result) => {
    if (!this.state.flagged) {
      this.setState({
        ...this.state,
        flagged: true
      });

      VibrationIOS.vibrate();
      if (this.props.forward) this.props.forward(result.data);
    }
  }

  render() {
    var cancelButton = null;
    this.barCodeFlag = true;
    
    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
    }

    return (
      <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        {cancelButton}
      </Camera>
    );
  }
}

class CancelButton extends Component {
  render() {
    return (
      <View style={styles.cancelButton}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.cancelButtonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = {

  camera: {
    height: 220,
    alignItems: 'center'
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
};

export default QRCodeScreen;