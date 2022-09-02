const path = require('path')
const utils = require('../utils/utils')
const webpackRules = require('./webpack.rules')
const webpackStats = require('./webpack.stats')
const webpackExternals = require('./webpack.externals')
const webpackOptimization = require('./webpack.optimization')

const webpackBaseConfig = {
	name: `app`,
	target: `web`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		main: utils.resolveDirectory(`./src/main.tsx`),
	},
	module: {
		rules: webpackRules,
	},
	resolve: {
		alias: {
			'@': path.resolve('./src/'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'vue'],
		// mainFields: ['main', 'index', 'browser'],
		// mainFiles: ['index'],
		modules: ['node_modules'],
		descriptionFiles: ['package.json'],
		enforceExtension: false,
	},
	performance: {
		hints: `warning`,
		maxAssetSize: 40000000,
		maxEntrypointSize: 60000000,
		// assetFilter(assetFilename) {
		// 	return !(/\.map$/.test(assetFilename))
		// },
	},
	optimization: webpackOptimization,
	stats: webpackStats,
	externals: webpackExternals,
}

module.exports = webpackBaseConfig
