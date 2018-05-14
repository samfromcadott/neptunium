const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: './ui.js',
	output: {
		filename: 'bundle.js',
		path: __dirname
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [{
				loader: 'style-loader' // creates style nodes from JS strings
			}, {
				loader: 'css-loader' // translates CSS into CommonJS
			}, {
				loader: 'less-loader' // compiles Less to CSS
			}]
		}]
	}
}
