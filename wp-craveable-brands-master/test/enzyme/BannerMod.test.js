import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import BannerMod from '../../theme-src/js/components/BannerMod';

describe('<BannerMod />', () => {
	const copy = 'Pizza';

  it(`should equal ${copy}`, () => {
		const wrapper = mount(
			<BannerMod
				image="http://localhost/wp-craveable-brands/wp-content/uploads/2017/06/pineapple-pizza-today-170222-tease_4cf54dc023c267b8ada26d6d5e6baac4.jpg"
				copy={copy}
			/>
		);
		expect(wrapper.props().image).to.be.a('string');
		expect(wrapper.props().copy).to.equal(copy);
  });
});
