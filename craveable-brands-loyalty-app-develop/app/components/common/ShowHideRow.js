import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Button from 'app/components/common/Button';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import Images from 'app/img/Image';

class ShowHideRow extends Component {
	constructor(props) {
    	super(props)
	    this.state = {
	      showAnswer: false
	    }
	  }


    toggleAwsern = () => {
        this.setState({
            showAnswer: !this.state.showAnswer
        });
    }

    renderAnswer = (styles, faq) => {
    	const { 
			buttonText,	
			ans
		} = styles;
    	
        if (this.state.showAnswer) {
            return (
                <View style={ans}>
					<Text style={[buttonText]}> *  {faq.answer}</Text>
				</View>
            );
        } else {
            return null;
        }
    }

    render() {
    	const { faq, styles } = this.props;
    	const { 
			buttonText,
			buttonContainerView,
			que
		} = styles;
        const img_name = this.state.showAnswer ? 'chevronDownWhite' : 'chevronRightWhite';
        return (
            <TouchableOpacity 
            	onPress={this.toggleAwsern}
            	style={buttonContainerView} >
				<View style={que}>
					<Text style={[buttonText]}>{faq.question}</Text>
					<Image style={{height: 10, width: 10}} source={Images[img_name]} />
				</View>
				{this.renderAnswer(styles, faq)}
			</TouchableOpacity>
        );
    }
}

export default ShowHideRow;