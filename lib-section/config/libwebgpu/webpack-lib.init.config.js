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
			name: `libwebgpu`,
			/* ... */
			rootPath: path.join(process.cwd(), `./dist/libwebgpu/@types`),
			entry: './main.d.ts',
			output: '../libwebgpu.d.ts',
		}),
	],
}

module.exports = webpackLibInitConfig
