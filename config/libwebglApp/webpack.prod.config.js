const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../utils/utils')
const webpackPlugins = require('../common/webpack.plugins')
const webpackInitConfig = require('./webpack.init.config')
const webpackDevServerConfig = require('../common/webpack.dev-server.config')

const webpackDevConfig = {
	mode: `production`,
	output: {
		path: utils.resolveDirectory(`./dist/libwebglApp/prod`),
		filename: `scripts/build.[name].[hash:8].js`,
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig(),
	plugins: [
		...webpackPlugins({
			mode: `production`,
			templateSrc: `./src/libwebglApp/template/index.ejs`,
			buildIndexHtmlTitle: `Canvas App`,
		}),
	],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
