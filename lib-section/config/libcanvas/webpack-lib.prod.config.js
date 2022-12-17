const path = require('path')
const { merge } = require('webpack-merge')
const webpackLibInitConfig = require('./webpack-lib.init.config')
const webpackLibPlugins = require('../common/webpack.plugins')
const rules = require('./webpack-lib.rules')
const utils = require('../utils/utils')

const webpackInitModule = webpackLibInitConfig.module
delete webpackLibInitConfig.module
const webpackConfig = {
	mode: 'production',
	output: {
		path: utils.resolveDirectory(`./dist/libcanvas/script`),
		publicPath: `./script`,
		filename: `libcanvas.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		...webpackInitModule,
		rules: [rules('libProdBuild')],
	},
	devtool: 'source-map',
	plugins: [
		...webpackLibPlugins({
			mode: `production`,
			htmlTemplateSrc: `./template/index.ejs`,
			htmlTemplateOutputFilename: `../index.html`,
			buildIndexHtmlTitle: `Canvas App`,
		}),
	],
}

module.exports = merge(webpackConfig, webpackLibInitConfig)
