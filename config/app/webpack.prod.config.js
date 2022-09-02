const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('../utils/utils')
const webpackPlugins = require('./webpack.plugins')
const webpackInitConfig = require('./webpack.init.config')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	mode: `production`,
	output: {
		path: utils.resolveDirectory(`./dist/prod`),
		filename: `scripts/build.[name].[hash:8].js`,
		// filename: `scripts/bundle.js`,
		chunkFilename: `scripts/chunks.[name].[chunkhash:8].js`,
	},
	devServer: webpackDevServerConfig,
	plugins: [...webpackPlugins(`production`)],
}

module.exports = merge(webpackDevConfig, webpackInitConfig)
