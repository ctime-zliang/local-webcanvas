const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildPlugin } = require('esbuild-loader')
const { DtsBundlePlugin } = require('../webpackPlugins/dts-bundle.plugin')
const utils = require('../utils/utils')

module.exports = ({ mode, htmlTemplateSrc, htmlTemplateOutputFilename, buildIndexHtmlTitle }) => {
	const plugins = [
		new HtmlWebpackPlugin({
			title: buildIndexHtmlTitle,
			filename: htmlTemplateOutputFilename,
			template: htmlTemplateSrc,
			inject: true,
			hash: false,
			cache: true,
			showErrors: true,
			minify: {
				minifyCSS: true,
				minifyJS: true,
			},
		}),
		new ESBuildPlugin(),
		new webpack.ProgressPlugin(),
		new DtsBundlePlugin({
			name: `libcanvas`,
			/* ... */
			rootPath: path.join(process.cwd(), `./dist/libcanvas/@types`),
			entry: './index.d.ts',
			output: '../script/libcanvas.d.ts',
		}),
	]
	if (mode === 'production') {
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerPort: 0,
			})
		)
	}
	return plugins
}
