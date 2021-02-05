class Form {
	constructor() {
		this.form = $('form.contact-form');
		this.baseUrl = $('meta[name=base_url]').attr('content');
		this.data = 'test';

		$.validate({
			form: '#contact',
			modules: 'html5',
		});

		this.setupFormSubmit();

		if ($('.lot-form').length) {
			this.setupLotToolTip();
		}
	}

	setupLotToolTip() {
		$('.lot-number').on('click', () => {
			$('.lot-number-tooltip').toggleClass('-visible');
		});

		$(document).mouseup((e) => {
			const $toolTip = $('.lot-number-tooltip');

			if (!$toolTip.is(e.target) && $toolTip.has(e.target).length === 0 && !$('.lot-number').is(e.target)) {
				$('.lot-number-tooltip').removeClass('-visible');
			}
		});
	}

	setupFormSubmit() {
		this.form.on('submit', (e) => {
			if (this.form.hasClass('-sending')) {
				return false;
			}

			if (this.form.find('#country').val() === '') {
				const $err = $('<span/>')
					.addClass('help-block form-error')
					.html('This is a required field');

				$('.country-selector').after($err);
				$('.country-selector').find('.selected').addClass('-error');

				$('.tray .options li').on('click', () => {
					$('.country-selector').find('.selected').removeClass('-error');
					$('.country-selector').next().remove();
				});

				e.preventDefault();

				return false;
			}

			e.preventDefault();

			// Serialise form
			this.data = this.form.serialize();

			// Add page identifier
			const pageId = this.form.attr('id');
			this.data += `&page=${pageId}`;

			if (!(this.form.find('.has-error').length) && this.form.find('#email').val().length) {
				this.form.addClass('-sending');
				$.ajax({
					type: 'POST',
					url: `${this.baseUrl}/api/submitForm/`,
					data: this.data,
					success: () => {
						const $submit = $('.submit-button .submit');
						this.form.removeClass('-sending');
						$submit.val('sent')
							.prop('disabled', true)
							.addClass('-success');
					},
					error: (res) => {
						this.form.removeClass('-sending');
						console.log('error');
						console.log(res);
					}
				});
			}

			return false;
		});
	}
}

export default Form;
