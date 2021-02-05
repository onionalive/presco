const React = require('react');
const Component = require('react').Component;
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;
const Header = require('./Header');

//export default Header = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<Header />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<Header />);
			expect(wrapper.find(div)).to.have.length(1);
	});
});
