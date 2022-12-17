const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../utils/utils')
const webpackPlugins = require('../common/webpack.plugins')
const webpackInitConfig = require('./webpack.init.config')

const webpackDevConfig = {
	mode: `development`,
	output: {
		path: utils.resolveDirectory(`./dist/libcanvasApp/dev`),
		// publicPath: './',
		filename: `scripts/build.[name].[hash:8].js`,
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	plugins: [
		...webpackPlugins({
			mode: `development`,
			htmlTemplateSrc: `./src/libcanvasApp/template/index.ejs`,
			htmlTemplateOutputFilename: `./index.html`,
			buildIndexHtmlTitle: `Canvas App`,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
