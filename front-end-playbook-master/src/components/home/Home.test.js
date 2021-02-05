const React = require('react');
const Component = require('react').Component;
const shallow = require('enzyme').shallow;
const expect = require('chai').expect;
const Home = require('./Home');

//export default Home = () => {
//	return (
//		<View>
//			<Text>enzyme</Text>
//			<Text>rules</Text>
//		</View>
//	);
//};

describe('<Home />', () => {
	it('should render one View', () => {
		const wrapper = shallow(<Home />);
			expect(wrapper.find(View)).to.have.length(1);
	});
});
