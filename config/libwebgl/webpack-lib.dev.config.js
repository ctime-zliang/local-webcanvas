const { merge } = require('webpack-merge')
const webpackLibInitConfig = require('./webpack-lib.init.config')
const rules = require('./webpack-lib.rules')
const utils = require('../utils/utils')

const webpackInitModule = webpackLibInitConfig.module
delete webpackLibInitConfig.module
const webpackConfig = {
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./lib/libwebgl/main.ts`),
	},
	output: {
		path: utils.resolveDirectory(`./build/libwebgl`),
		filename: `libwebgl.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		...webpackInitModule,
		rules: [rules('libDevBuild')],
	},
	devtool: 'source-map',
}

module.exports = merge(webpackConfig, webpackLibInitConfig)
