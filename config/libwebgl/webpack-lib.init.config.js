const path = require('path')
const webpack = require('webpack')
const { ESBuildPlugin } = require('esbuild-loader')
const { DtsBundlePlugin } = require('../webpackPlugins/dts-bundle.plugin')
const utils = require('../utils/utils')

const webpackLibInitConfig = {
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
	},
	module: {},
	plugins: [
		new ESBuildPlugin(),
		new webpack.ProgressPlugin(),
		new DtsBundlePlugin({
			name: `libwebgl`,
			/* ... */
			rootPath: path.join(process.cwd(), `./build/libwebgl/@types`),
			entry: './libwebgl/main.d.ts',
			output: '../libwebgl.d.ts',
		}),
	],
}

module.exports = webpackLibInitConfig
