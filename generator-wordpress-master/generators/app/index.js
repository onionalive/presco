/* jshint node: true */
/* global process, require */

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var validator = require('validator');
var path = require('path');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
	prompting: function() {
		var done = this.async();

		this.log(yosay(
			'Welcome to the ' + chalk.red('Wordpress Theme') + ' generator!'
		));

		var prompts = [{
			name: 'name',
			type: 'input',
			message: 'What is the name of the site?',
			default: 'My New Site',
			validate: function(s) {
				return !validator.isNull(s);
			}
		}, {
			name: 'slug',
			type: 'input',
			message: 'Enter a slug for the site',
			default: 'my-new-site',
			validate: function(s) {
				return !validator.isNull(s);
			}
		}, {
			name: 'acf',
			type: 'input',
			message: 'Enter your ACF Pro key',
			default: '',
			validate: function(s) {
				return !validator.isNull(s);
			}
		}];

		this.prompt(prompts, function(props) {
			this.props = props;
			this.props.dirname = process.cwd().split(path.sep).pop();
			done();
		}.bind(this));
	},

	writing: {
		projectFiles: function() {
			// Add project files
			this.fs.copyTpl(
				this.templatePath('_env'),
				this.destinationPath('.env'),
				{
					acf: this.props.acf
				}
			);
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					slug: this.props.dirname
				}
			);
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				{
					slug: this.props.dirname
				}
			);
			this.fs.copyTpl(
				this.templatePath('_babelrc'),
				this.destinationPath('.babelrc')
			);
			this.fs.copyTpl(
				this.templatePath('_eslintrc.json'),
				this.destinationPath('.eslintrc.json')
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
			this.fs.copyTpl(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js'),
				{
					slug: this.props.slug
				}
			);
			this.fs.copyTpl(
				this.templatePath('_gitignore'),
				this.destinationPath('.gitignore'),
				{
					slug: this.props.slug
				}
			);
		},

		themeInfo: function() {
			this.fs.copyTpl(
				this.templatePath('theme-info.txt'),
				this.destinationPath('theme-src/theme-info.txt'),
				{
					name: this.props.name
				}
			);
		},

		php: function() {
			this.fs.copy(
				this.templatePath('**/*.php'),
				this.destinationPath('theme-src/')
			);
		},

		twig: function() {
			this.fs.copy(
				this.templatePath('**/*.twig'),
				this.destinationPath('theme-src/')
			);
		},

		css: function() {
			this.fs.copy(
				this.templatePath('css/**/*.scss'),
				this.destinationPath('theme-src/css')
			);
		},

		js: function() {
			this.fs.copy(
				this.templatePath('js/**/*.js'),
				this.destinationPath('theme-src/js')
			);
		},

		test: function() {
			this.fs.copy(
				this.templatePath('test/**/*.js'),
				this.destinationPath('test')
			);
		}
	},
	install: {
		wordpress: function() {
			this.log('Installing Wordpress');
			var done = this.async();
			var src = this.templatePath('_composer.json');
			var dest = this.destinationPath('composer.json');
			var _yo = this;
			fs.readFile(src, 'utf8', function(err,data) {
				fs.writeFile(dest, data, function() {
					_yo.spawnCommand('composer', ['install']).on('close', function () {
						done();
					});
				});
			});
		},
		dependencies: function () {
    		this.installDependencies();
    	}
	}
});
