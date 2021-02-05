import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View } from 'react-native';
import axios from 'axios';

/* user imports */
import Animator from 'app/components/common/CardStackAnimator';

class CardStackContainer extends Component {
	constructor({ children }) {
		super();
		this.state = { stack: children };
	}

	/**
	 * Handle a toss of a screen element
	 * @param {*} callback Callback function passed down
	 */
	onToss(callback) {
		let stack = [...this.state.stack];
		this.setState(
			{
			stack: stack.filter((item, index) => index !== stack.length - 1),
			toss: false,
			},
			callback
		);
	}

	componentWillReceiveProps({ children }) {
		if (children !== this.props.children) this.setState({ stack: children });
	}

	render() {
		let { stack, toss } = this.state;
		let { onTossLeft, onTossRight, actionsBar } = this.props;

		return (
			<View style={{ flex: 1, justifyContent: 'center',
			alignItems: 'center'}}>
				{React.Children.map(stack, (child, index) => (
					<Animator
						toss={index === stack.length - 1 ? toss : false}
						onTossRight={() => this.onToss(() => onTossRight(child.props))}
						onTossLeft={() => this.onToss(() => onTossLeft(child.props))}
						index={index}
					>
						{child}
					</Animator>
				))}
			</View>
		);
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

export default CardStackContainer;
