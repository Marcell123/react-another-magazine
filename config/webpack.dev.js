const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.common');

module.exports = merge.smart(webpackCommon, {
	mode: 'development',
	output: {
		publicPath: '/',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../build')
	},
	devServer: {
		hot: true,
		open: true,
		overlay: true,
		contentBase: path.join(__dirname, 'build'),
		publicPath: '/',
		host: 'localhost',
		port: 8015,
	},
	devtool: 'cheap-eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})