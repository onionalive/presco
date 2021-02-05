import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
import {Actions} from 'react-native-router-flux';

class BrokerButton extends Component {
	constructor(props) {
    super(props);
  }

  _navigate(page) {
    this.props.navigator.push({
      name: page,
    });
  }

  navigateToBrokerPage() {
    this.props.action();
    Actions.table();
  }

  render() {
    return (
      <TouchableHighlight 
      	underlayColor='rgba(0,0,0,0)' 
        onPress={() => this.navigateToBrokerPage()}
        testID="test-id-button"
      >
        <View style={this.props.resize ? [styles.brokerStyles, styles.resizeMargins, {width: this.props.width}] : [styles.brokerStyles, {width: this.props.width}]}>
          <Image 
            style={styles.brokerIcon}
            source={require('../../img/find_broker_icon.png')}
          />
          <Text style={styles.text}>Find A Broker</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brokerStyles: {
    backgroundColor: '#76CA44',
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  resizeMargins: {
    marginTop: 8,
    marginBottom:8,
    height: 50
  },
  brokerIcon: {
    width: 34,
    height: 33,
    marginRight: 10,
  },
});

export default BrokerButton;
