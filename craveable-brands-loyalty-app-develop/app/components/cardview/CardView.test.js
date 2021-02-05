import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import CardViewView from '../app/components/lower/CardViewView';

//export default CardViewView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<CardViewView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<CardViewView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});