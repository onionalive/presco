'use strict';
var Generator = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
	constructor: function () {
		Generator.apply(this, arguments);

		// add option to skip install
		this.option('skip-install');
	},
	prompting: {
		init: function () {
			var prompts = [{
				name: 'siteName',
				message: 'What\'s the name of your site?',
				default: 'StaticSite'
			}, {
				name: 'siteDescription',
				message: 'Sum up your new site in a short sentence:',
				default: 'Just a static site built by pc-static'
			}];

			return this.prompt(prompts).then(function (response) {
				try {
					this.options.siteName = response.siteName.toLowerCase();
					this.options.siteDescription = response.siteDescription.toLowerCase();
				} catch (err) {
					console.log(chalk.red('siteName and siteDescription failed'));
				}
			}.bind(this));
		},
		optionalFeatures: function () {
			// Ask for the different features to include in the build
			var prompts = [{
				type: 'checkbox',
				name: 'npmPackages',
				message: 'What features would you like?',
				choices: [{
					type: 'separator',
					line: '- The Essentials - '
				}, {
					name: 'jQuery - Javascript library',
					value: 'jquery',
					checked: true
				}, {
					name: 'Normalize.scss - Cross-browser consistency in the default styling of HTML elements',
					value: 'node-normalize-scss',
					checked: true
				}, {
					name: 'Neat - Grid system',
					value: 'node-neat',
					checked: true
				}, {
					type: 'separator',
					line: '- Extras - '
				}, {
					name: 'Font Awesome - Icon library',
					value: 'node-font-awesome',
					checked: false
				}, {
					name: 'Bourbon - Handy mixin library',
					value: 'node-bourbon',
					checked: false
				}, {
					name: 'Slick Carousel - The most decent carousel at the moment',
					value: 'slick-carousel',
					checked: false
				}, {
					name: 'Scroll Reveal - Easy revealing divs on scroll (Not IE9 compatible)',
					value: 'scrollreveal',
					checked: false
				}, {
					name: 'RxJS - Reactive Javascript',
					value: 'rxjs',
					checked: false
				}]
			}, {
				type: 'list',
				name: 'cms',
				message: 'Do you need support for (defaults to no cms):',
				default: 'no-cms',
				choices: [{
					name: 'DatoCMS',
					value: 'datocms-client'
				}, {
					name: 'Contentful',
					value: 'contentful-metalsmith'
				}, {
					name: 'No CMS - JSON file',
					value: 'no-cms'
				}]
			}, {
				type: 'checkbox',
				name: 'optionalFeatures',
				message: 'Do you need any of the following?',
				choices: [{
					name: 'Amazon S3 sync deploy script',
					value: 's3Sync',
					checked: false
				}, {
					name: 'Cloudfront CDN',
					value: 'cloudfront',
					checked: false
				}, {
					name: 'Typekit Kit',
					value: 'typekit',
					checked: false
				}, {
					name: 'Google Analytics',
					value: 'ga',
					checked: false
				}]
			}, {
				type: 'input',
				name: 'awsAccessKey',
				message: 'Please enter your AWS S3 Access Key (if you don\'t have it set up yet, leave blank):',
				default: 'XXXX',
				when: function (prompts) {
					try {
						return prompts.optionalFeatures.indexOf('s3Sync') > -1;
					} catch (err) {
						console.log(chalk.red('s3Sync undefined'));
					}
				}
			}, {
				type: 'input',
				name: 'awsSecretKey',
				message: 'Please enter your AWS S3 Secret Key (if you don\'t have it set up yet, leave blank):',
				default: 'XXXX',
				when: function (prompts) {
					try {
						return prompts.optionalFeatures.indexOf('s3Sync') > -1;
					} catch (err) {
						console.log(chalk.red('s3Sync undefined'));
					}
				}
			}, {
				type: 'input',
				name: 's3BucketName',
				message: 'Please enter your AWS S3 Bucket name (if you don\'t have it set up yet, leave blank):',
				default: 'XXXX',
				when: function (prompts) {
					try {
						return prompts.optionalFeatures.indexOf('s3Sync') > -1;
					} catch (err) {
						console.log(chalk.red('s3Sync undefined'));
					}
				}
			}, {
				type: 'input',
				name: 'cloudfrontDistributionID',
				message: 'Please enter your Cloudfront Distribution ID (if you don\'t have it set up yet, leave blank):',
				default: 'XXXX',
				when: function (prompts) {
					try {
						return prompts.optionalFeatures.indexOf('cloudfront') > -1;
					} catch (err) {
						console.log(chalk.red('cloudfront undefined'));
					}
				}
			}, {
				type: 'input',
				name: 'datoReadOnlyKey',
				message: 'Please enter your Dato CMS Read Only Key (if you don\'t have it set up yet, leave blank):',
				default: 'XXXXX',
				when: function (prompts) {
					return prompts.cms.indexOf('datocms-client') > -1;
				}
			}, {
				type: 'input',
				name: 'contentfulAccessToken',
				message: 'Please enter your Contentful Access Token (if you don\'t have it set up yet, leave blank):',
				default: 'XXXXX',
				when: function (prompts) {
					return prompts.cms.indexOf('contentful-metalsmith') > -1;
				}
			}, {
				type: 'input',
				name: 'contentfulSpaceId',
				message: 'Please enter your Contentful Space ID (if you don\'t have it set up yet, leave blank):',
				default: 'XXXXX',
				when: function (prompts) {
					return prompts.cms.indexOf('contentful-metalsmith') > -1;
				}
			}, {
				type: 'input',
				name: 'typekitID',
				message: 'Please enter your Typekit Kit ID (if you don\'t have it set up yet, leave blank):',
				default: 'XXXXXX',
				store: true,
				when: function (prompts) {
					return prompts.optionalFeatures.indexOf('typekit') > -1;;
				},
			}, {
				type: 'input',
				name: 'googleAnalyticsID',
				message: 'Add your Google Analytics ID (if you don\'t have it set up yet, leave blank):',
				default: 'UA-XXXXX-X',
				store: true,
				when: function (prompts) {
					return prompts.optionalFeatures.indexOf('ga') > -1;
				}
			}];

			return this.prompt(prompts).then(function (response) {
				if (response.optionalFeatures.length !== 0) {
					this.options.optionalFeatures = response.optionalFeatures;
				} else {
					this.options.optionalFeatures = [];
				}

				if (response.cms.length !== 0) {
					this.options.cms = response.cms;
				} else {
					this.options.cms = [];
				}

				if (response.npmPackages.length !== 0) {
					if (response.optionalFeatures.indexOf('s3Sync') > -1) {
						response.npmPackages.push('gulp-cloudfront-invalidate-aws-publish');
					}
					this.options.npmPackages = response.npmPackages;
				} else {
					this.options.npmPackages = [];
				}

				// Set configs
				this.options.awsAccessKey = (response.awsAccessKey ? response.awsAccessKey : '');
				this.options.awsSecretKey = (response.awsSecretKey ? response.awsSecretKey : '');
				this.options.s3BucketName = (response.s3BucketName ? response.s3BucketName : '');
				this.options.cloudfrontDistributionID = (response.cloudfrontDistributionID ? response.cloudfrontDistributionID : '');
				this.options.datoReadOnlyKey = (response.datoReadOnlyKey ? response.datoReadOnlyKey : '');
				this.options.typekitID = (response.typekitID ? response.typekitID : '');
				this.options.googleAnalyticsID = (response.googleAnalyticsID ? response.googleAnalyticsID : '');
				this.options.contentfulAccessToken = (response.contentfulAccessToken ? response.contentfulAccessToken : '');
				this.options.contentfulSpaceId = (response.contentfulSpaceId ? response.contentfulSpaceId : '');
			}.bind(this));
		}
	},
	writing: {
		projectFiles: function () {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					siteName: this.options.siteName.replace(/\s/g, ''),
					dato: this.options.cms.indexOf('datocms-client') > -1 ? true : false,
					contentful: this.options.cms.indexOf('contentful-metalsmith') > -1 ? true : false
				}
			);
			this.fs.copyTpl(
				this.templatePath('_gulpfile.babel.js'),
				this.destinationPath('gulpfile.babel.js'), {
					jquery: this.options.npmPackages.indexOf('jquery') > -1 ? true : false,
					normalize: this.options.npmPackages.indexOf('node-normalize-scss') > -1 ? true : false,
					neat: this.options.npmPackages.indexOf('node-neat') > -1 ? true : false,
					dato: this.options.cms.indexOf('datocms-client') > -1 ? true : false,
					fontAwesome: this.options.npmPackages.indexOf('node-font-awesome') > -1 ? true : false,
					bourbon: this.options.npmPackages.indexOf('node-bourbon') > -1 ? true : false,
					slick: this.options.npmPackages.indexOf('slick-carousel') > -1 ? true : false,
					scrollReveal: this.options.npmPackages.indexOf('scrollreveal') > -1 ? true : false,
					s3Sync: this.options.optionalFeatures.indexOf('s3Sync') > -1 ? true : false,
					contentful: this.options.cms.indexOf('contentful-metalsmith') > -1 ? true : false,
					nocms: this.options.cms.indexOf('no-cms') > -1 ? true : false
				}
			);
			if (this.options.cms.indexOf('datocms-client') > -1) {
				this.fs.copy(
					this.templatePath('_dato.config.js'),
					this.destinationPath('dato.config.js')
				);
			}

			if (this.options.cms.indexOf('contentful-metalsmith') > -1) {
				this.fs.copy(
					this.templatePath('lib/contentful-helper'),
					this.destinationPath('lib/contentful-helper')
				);
			}
		},
		hintAndLint: function () {
			this.fs.copyTpl(
				this.templatePath('_babelrc'),
				this.destinationPath('.babelrc')
			);

			this.fs.copyTpl(
				this.templatePath('_eslintrc'),
				this.destinationPath('.eslintrc')
			);

			this.fs.copyTpl(
				this.templatePath('_eslintignore'),
				this.destinationPath('.eslintignore')
			);

			this.fs.copyTpl(
				this.templatePath('_bowerrc'),
				this.destinationPath('.bowerrc')
			);

			this.fs.copyTpl(
				this.templatePath('_jshintrc'),
				this.destinationPath('.jshintrc')
			);

			this.fs.copyTpl(
				this.templatePath('_sass-lint.yml'),
				this.destinationPath('.sass-lint.yml')
			);
		},
		markdown: function () {
			this.fs.copyTpl(
				this.templatePath('src/**/*.md'),
				this.destinationPath('src/'), {
					siteName: this.options.siteName,
					siteDescription: this.options.siteDescription,
					typekitID: this.options.typekitID,
					gaID: this.options.googleAnalyticsID,
					slick: this.options.npmPackages.indexOf('slick-carousel') > -1 ? true : false,
					contentful: this.options.cms.indexOf('contentful-metalsmith') > -1 ? true : false
				}
			);
		},
		nunjucks: function () {
			this.fs.copyTpl(
				this.templatePath('src/**/*.njk'),
				this.destinationPath('src/'), {
					siteName: this.options.siteName,
					siteDescription: this.options.siteDescription,
					typekitID: this.options.typekitID,
					gaID: this.options.googleAnalyticsID,
					slick: this.options.cms.indexOf('slick-carousel') > -1 ? true : false
				});
		},
		testing: function () {
			this.fs.copy(
				this.templatePath('test/casperjs/*.test.js'),
				this.destinationPath('test/casperjs/')
			);
			this.fs.copy(
				this.templatePath('test/mocha/*.test.js'),
				this.destinationPath('test/mocha/')
			);
		},
		data: function () {
			if (this.options.cms.indexOf('no-cms') > -1) {
				this.fs.copyTpl(
					this.templatePath('src/html/data/**/*.json'),
					this.destinationPath('src/html/data')
				);
			}
		},
		css: function () {
			this.fs.copyTpl(
				this.templatePath('src/css/**/*.scss'),
				this.destinationPath('src/css/'), {
					normalize: this.options.npmPackages.indexOf('node-normalize-scss') > -1 ? true : false,
					neat: this.options.npmPackages.indexOf('node-neat') > -1 ? true : false,
					fontAwesome: this.options.npmPackages.indexOf('node-font-awesome') > -1 ? true : false,
					bourbon: this.options.npmPackages.indexOf('node-bourbon') > -1 ? true : false,
					slick: this.options.npmPackages.indexOf('slick-carousel') > -1 ? true : false
				}
			);
		},
		js: function () {
			this.fs.copyTpl(
				this.templatePath('src/js/**/*.js'),
				this.destinationPath('src/js/'), {
					jquery: this.options.npmPackages.indexOf('jquery') > -1 ? true : false,
					slick: this.options.npmPackages.indexOf('slick-carousel') > -1 ? true : false,
					scrollReveal: this.options.npmPackages.indexOf('scrollReveal') > -1 ? true : false,
				}
			);

			this.fs.copy(
				this.templatePath('_webpack.config.js'),
				this.destinationPath('webpack.config.js')
			);
		},
		git: function () {
			this.fs.copy(
				this.templatePath('_gitignore'),
				this.destinationPath('.gitignore')
			);
		},
		env: function () {
			this.fs.copyTpl(
				this.templatePath('_env'),
				this.destinationPath('.env'), {
					awsAccessKey: this.options.awsAccessKey,
					awsSecretKey: this.options.awsSecretKey,
					s3BucketName: this.options.s3BucketName,
					cloudfrontDistributionID: this.options.cloudfrontDistributionID,
					datoReadOnlyKey: this.options.datoReadOnlyKey,
					dato: this.options.cms.indexOf('datocms-client') > -1 ? true : false,
					contentfulAccessToken: this.options.contentfulAccessToken,
					contentfulSpaceId: this.options.contentfulSpaceId,
					contentful: this.options.cms.indexOf('contentful-metalsmith') > -1 ? true : false
				}
			);
		}
	},
	install: function () {
		if (!this.options['skip-install']) {
			this.yarnInstall(this.options.npmPackages, {
				'dev': true
			});

			if (!this.options.cms.indexOf('no-cms') > -1) {
				this.yarnInstall(this.options.cms, {
					'dev': false
				});
			}
		}
	},
	end: function () {
		if (!this.options['testing']) {
			this.spawnCommand('gulp', ['serve']);
		}
	},

	_featureEnabled: function (feature) {
		return this.options.optionalFeatures.indexOf(feature) > -1;
	}
});
