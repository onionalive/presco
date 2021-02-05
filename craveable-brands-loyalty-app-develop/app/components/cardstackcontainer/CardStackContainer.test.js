import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import CardStackContainerView from '../app/components/lower/CardStackContainerView';

//export default CardStackContainerView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<CardStackContainerView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<CardStackContainerView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});