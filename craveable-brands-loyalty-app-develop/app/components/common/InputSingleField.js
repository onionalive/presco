import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TextInput } from 'react-native';
import axios from 'axios';

/* user imports */

class InputSingleField extends Component {

	state = {
		one: '',
		two: '',
		three: ''
	};

	render() {
		const { placeholder, error, title } = this.props;
		const { textStyle, initStyle, flexCenter } = styles;

		return (
			<View style={ [flexCenter, initStyle] }>
				<View style={{flexDirection: 'row', padding: 30}}>
					<TextInput
						underlineColorAndroid='transparent'
						style={{height: 40, width: 20, borderBottomColor: 'white', borderBottomWidth: 1,
							marginRight: 10,
							textAlign: 'center'
						}}
						onSelectionChange={(event) => {
							console.log('event', event.nativeEvent.selection);
						}}
						onChangeText={(text) => {
							this.setState({
								...this.state,
								one: text
							});
							this.refs.SecondInput.focus();
						}}
					/>
					<TextInput
						underlineColorAndroid='transparent'
						ref='SecondInput'
						style={{height: 40, width: 20, borderBottomColor: 'white', borderBottomWidth: 1,
							marginRight: 10,
							textAlign: 'center'
						}}
						onChangeText={(text) => {
							this.setState({
								...this.state,
								two: text
							});
							this.refs.ThirdInput.focus();
						}}
					/>
					<TextInput
						underlineColorAndroid='transparent'
						ref='ThirdInput'
						style={{height: 40, width: 20, borderBottomColor: 'white', borderBottomWidth: 1,
							marginRight: 10,
							textAlign: 'center'
						}}
						onChangeText={(text) => {
							this.setState({
								...this.state,
								three: text
							});
						}}
					/>
				</View>
				<Text>{error}</Text>
			</View>
		);
	}
}

const styles = {
	textStyle: {
		fontSize: 20,
		backgroundColor: 'white'
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default InputSingleField;
