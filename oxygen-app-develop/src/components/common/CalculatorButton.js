import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
import { Oxygen } from '../../styles/colours';
import {Actions} from 'react-native-router-flux';

class CalculatorButton extends Component {
	constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight 
      	underlayColor='rgba(0,0,0,0)'
      	onPress={Actions.calc}
      >
        <View style={this.props.resize ? [styles.income, styles.resizeMargins] : styles.income}>
          <Image 
            style={styles.loanLogo}
            source={require('../../img/loan_calculator_logo.png')}
          />
          <Text style={styles.text}>Loan Calculators</Text>
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
  income: {
    height: 60,
    backgroundColor: Oxygen.lightBlue,
    width: Dimensions.get('window').width/1.2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  resizeMargins: {
    marginTop: 2,
    marginBottom:0,
    height: 50
  },
  loanLogo: {
    width: 26,
    height: 30,
    marginRight: 10,
  },
});

export default CalculatorButton;
