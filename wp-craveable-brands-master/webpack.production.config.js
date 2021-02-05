
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var sassLintPlugin = require('sasslint-webpack-plugin');
var WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

module.exports = {
	devtool: 'cheap-module-source-map',
	devServer: {
		historyApiFallback: true, // This will make the server understand "/some-link" routs instead of "/#/some-link"
	},
	entry: [
		'babel-polyfill',
		'./theme-src/js/' // This is where Webpack will be looking for the entry index.js file
	],
	output: {
		path: path.join(__dirname, 'build'), // This is used to specify folder for producion bundle
		filename: 'scripts.min.js', // Filename for production bundle
		publicPath: '/'
	},
	resolve: {
		modules: [
			'node_modules',
			'theme-src',
			path.resolve(__dirname, 'theme-src/js'),
			path.resolve(__dirname, 'node_modules')
		], // Folders where Webpack is going to look for files to bundle together
		extensions: ['.jsx', '.js'] // Extensions that Webpack is going to expect
	},
	module: {
		// Loaders allow you to preprocess files as you require() or “load” them. 
		// Loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle frontend build steps.
		loaders
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		
		new webpack.NoEmitOnErrorsPlugin(), // Webpack will let you know if there are any errors

		// Declare global variables
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			_: 'lodash'
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false,
			},
			sourceMap: false
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './theme-src/index.html',
			hash: false
		}),

		new WebpackBundleSizeAnalyzerPlugin('./webpack-bundle.txt')
	]
}
