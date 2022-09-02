const utils = require('../utils/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk')

module.exports = mode => {
	const plugins = [
		new HtmlWebpackPlugin({
			title: 'Webpack Build Test',
			filename: `./index.html`,
			template: utils.resolveDirectory('./src/template/index.ejs'),
			// templateContent(templateParams, compilation, callback) {
			// 	callback(null, '..')
			// },
			// favicon: utils.resolveDirectory('./src/assets/images/log.jpg'),
			inject: true,
			hash: false,
			cache: true,
			showErrors: true,
			minify: {
				minifyCSS: true,
				minifyJS: true,
			},
		}),
		// new UglifyjsWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `assets/styles/style.[name].[hash:8].css`,
			chunkFilename: `assets/styles/chunks.[name].[chunkhash:8].css`,
			ignoreOrder: false,
			attributes: { id: `link${new Date().getTime()}` },
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode),
		}),
		// new ESLintPlugin({
		// 	extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
		// }),
		new progressBarWebpackPlugin({
			format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
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
