import React, { Component } from 'react';
import { Platform, Text, View, TextInput, Image } from 'react-native';
import { Oxygen } from '../../styles/colours';
import Layout from '../../styles/layout';

// components
import Logo from './Logo';
import HomeButton from './HomeButton';


class SearchView extends Component {
	constructor(props) {
    super(props);
  }

  render() {
  	const { searchIcon, textInput, inputContainer } = styles;

		return (
			<View style={ inputContainer }>
				<Image
					style={ searchIcon }
					source={require('../../img/search.png')}
				/>
				<TextInput
					style={ textInput }
					onChangeText={(text) => this.props.updateSearch({text})}
					selectTextOnFocus={true}
					value={this.props.query}
					underlineColorAndroid='transparent'
				/>
			</View>
		);
  }
};

const styles = {
	inputContainer: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10
	},
	searchIcon: {
		position: 'absolute',
		left: 10,
		top: 10,
		zIndex: 1
	},
	textInput: {
		height: 40,
		paddingLeft: 40,
		paddingTop: Platform.OS === 'android' ? 11 : 4,
		borderColor: 'gray',
		borderRadius: 5,
		backgroundColor: Oxygen.offWhite,
		shadowColor: Platform.OS === 'android' ? Oxygen.offWhite : Oxygen.black,
		shadowOffset: {
			height: 1
		},
		shadowOpacity: 0.1,
		fontFamily: 'ProximaNova-Regular'
	}
};

export default SearchView;
