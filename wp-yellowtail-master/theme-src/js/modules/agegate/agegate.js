import AgegateSelector from './agegateSelector';
import AgegateCountrySelect from './AgegateCountrySelect';

class Agegate {

	constructor() {
		this.$filter = $('.agegate-filter');
		this.$selected = this.$filter.find('.filter-selected');
		this.$filterOption = $('.agegate-filter-options li');
		this.$submit = $('.welcome-mat');
		this.baseUrl = $('meta[name=base_url]').attr('content');

		if ($.cookieStorage && $.cookieStorage.isEmpty('ytAgegate')) {
			$.cookieStorage.setExpires(1);
			$.cookieStorage.setPath('/');
			this.ajaxAgegate();
		}
	}

	ajaxAgegate() {
		return $.ajax({
			url: `${this.baseUrl}/agegate`,
			dataType: 'html',
			type: 'GET',
			success: data => Agegate.ajaxReturn(data),
			error: data => Agegate.outputError(data),
		});
	}

	static ajaxReturn(data) {
		$('body').addClass('no-scroll');

		$('body').append(data);

		const agegateSelector = new AgegateSelector();
		agegateSelector.init();

		const agegateCountrySelect = new AgegateCountrySelect();
		agegateCountrySelect.init();
	}

	static outputError(error) {
		console.log(error);
		console.log(this.$filter);
	}
}

export default Agegate;
