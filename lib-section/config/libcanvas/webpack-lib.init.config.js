const path = require('path')
const webpack = require('webpack')
const webpackStats = require('../common/webpack.stats')
const webpackOptimization = require('../common/webpack.optimization')
const utils = require('../utils/utils')

const webpackLibInitConfig = {
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
	},
	entry: {
		main: utils.resolveDirectory(`./src-canvas/main.ts`),
	},
	module: {},
	resolve: {
		alias: {
			'@': path.resolve('./src/'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'vue'],
		enforceExtension: false,
	},
	performance: {
		hints: `warning`,
		maxAssetSize: 40000000,
		maxEntrypointSize: 60000000,
	},
	optimization: webpackOptimization(),
	stats: webpackStats(),
}

module.exports = webpackLibInitConfig
