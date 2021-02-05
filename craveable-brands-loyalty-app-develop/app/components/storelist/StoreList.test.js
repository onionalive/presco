import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StoreListViewView from '../app/components/lower/StoreListViewView';

//export default StoreListViewView = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<StoreListViewView />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<StoreListViewView />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});