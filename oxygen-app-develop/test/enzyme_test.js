import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';

const Test = () => {
	return (
		<View>
			<Text>enzyme</Text>
			<Text>rules</Text>
		</View>
	);
};

export default Test;

describe('<Test />', () => {
  it('should render one View', () => {
    const wrapper = shallow(<Test />);
    expect(wrapper.find(View)).to.have.length(1);
  });
});