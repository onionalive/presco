var path = require('path');

module.exports = [
  {
      test: /\.jsx?$/, // Here we're going to use JS for react components but including JSX in case this extension is preferable
      include: [
          path.resolve(__dirname, "theme-src"),
      ],
      loader: ['react-hot-loader']
  },
  {
      loader: "babel-loader",

      // Skip any files outside of your project's `theme-src` directory
      include: [
          path.resolve(__dirname, "theme-src"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
          plugins: ['transform-runtime'],
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react'
         ],
      }
  },
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	},
	{
		test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		use: [{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'fonts/',
				publicPath: '../',
			}
		}]
	}
];
