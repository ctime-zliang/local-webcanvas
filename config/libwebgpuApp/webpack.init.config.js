const path = require('path')
const utils = require('../utils/utils')
const webpackRules = require('../common/webpack.rules')
const webpackStats = require('../common/webpack.stats')
const webpackOptimization = require('../common/webpack.optimization')

const webpackBaseConfig = {
	name: `app`,
	target: `web`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		main: utils.resolveDirectory(`./src/libwebgpuApp/index.tsx`),
	},
	module: {
		rules: webpackRules(),
	},
	resolve: {
		alias: {
			'@': path.resolve('./src/'),
			'@libwebgpu': path.resolve('./libsrc/libwebgpu/'),
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

module.exports = webpackBaseConfig
