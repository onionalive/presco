import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import Colours from 'app/styles/Colours';

/* user imports */

class InputField extends Component {

	state = {
		text: '',
		focused: false
	};

	render() {
		const { placeholder, error, title, style, editable, keyboardType } = this.props;
		const placeholderTextColor = this.props.placeholderTextColor ?
			this.props.placeholderTextColor :
			Colours.cGrey;
		
		const { textInput, container } = styles;
		const textInputColor = {
			color: this.props.alt ? Colours.cWhite : Colours.cBlack
		}
		
		const underlineColor = {
			borderBottomColor: this.props.underlineColor ? 
					this.props.underlineColor :
					Colours.cWhite
		}

		const autoCapitalize = (keyboardType == 'email-address') ? 'none' : 'sentences';

		const isFocused = this.state.focused ?
			underlineColor :
			null;

		const action = this.props.onChangeText ? 
			(text) => this.props.onChangeText(text) :
			(text) => console.log(text);

		return (
			<View style={[container, style]}>
				{ title && <Text>{title}</Text>}
				<TextInput
					underlineColorAndroid='transparent'
					placeholderTextColor={placeholderTextColor}
					style={[textInput, textInputColor, isFocused]}
					onChangeText={action}
					placeholder={placeholder}
					editable={editable}
					keyboardType={keyboardType ? keyboardType : 'default'}
					autoCapitalize={autoCapitalize}
					onFocus={() => {
						this.setState({
							...this.state,
							focused: true
						});
						if (this.props.onFocus) this.props.onFocus();
					}}
					onBlur={() => {
						this.setState({
							...this.state,
							focused: false
						});
						if (this.props.onBlur) this.props.onBlur();
					}}
					secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
				/>
				<Text>{error}</Text>
			</View>
		);
	}
}

const styles = {
	container: {
		width: '100%',
		position: 'relative',
		paddingLeft: 20,
        paddingRight: 20
	},
	textInput: {
		height: 40, 
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: Colours.cOffWhite
	}
};

export default InputField;
