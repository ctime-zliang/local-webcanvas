const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('../utils/utils')

const cssLoaderOptions = {
	esModule: false,
	// minimize: false,
	import: true,
	url: true,
	// camelCase: false,
	sourceMap: true,
	// root: `.`
}

const cssLoaderModuleOptions = {
	...cssLoaderOptions,
	modules: {
		mode: 'local',
		localIdentHashSalt: `hash`,
		localIdentHashFunction: `md4`,
		localIdentHashDigest: `base64`,
		localIdentContext: path.resolve(__dirname, `../src`),
		localIdentName: `[name]_-[hash:base64:8]`,
		// exportLocalsConvention: `camelCase`,
		namedExport: false,
	},
}

const lessLoaderOptions = {
	sourceMap: true,
	webpackImporter: true,
	lessOptions(loaderContext) {
		return {
			/* 内联脚本支持 */
			javascriptEnabled: true,
			strictMath: false,
		}
	},
}

const miniCssExtractPluginLoaderOption = {
	// publicPath: `../assets-images/`,
	publicPath: `../`,
}

const iniFileLoader = {
	test: /\.ini$/,
	exclude: /node_modules/,
	// include: /src/
	use: [
		{
			loader: `ini-translate-loader`,
			options: {
				loaderTitle: `ini-translate-loader`,
			},
		},
		{
			loader: `ini-parser-loader`,
			options: {
				loaderTitle: `ini-parser-loader`,
			},
		},
	],
}

const jsxBabelLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	// loader: `babel-loader`,  // use: `babel-loader`
	use: [
		{
			loader: `babel-loader`,
		},
	],
}
const tsxBabelLoader = {
	test: /\.ts[x]?$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `babel-loader`,
		},
	],
}

const jsxEsbuildLoader = {
	test: /\.(js|jsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}
const tsxEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}

const lessLoader = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		// {
		// 	loader: `style-test-loader`,
		// },
		// {
		// 	loader: `style-loader`,
		// 	options: {
		// 		attributes: {
		// 			id: String(Math.random())
		// 		},
		// 		insert: `head`,
		// 		injectType: `styleTag`  // default: styleTag
		// 	}
		// },
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const lessModuleLoader = {
	test: /\.module\.less$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const cssLoader = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}
const cssModuleLoader = {
	test: /\.module\.css$/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const urlFileLoader = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	// exclude: /node_modules/,
	use: [
		{
			loader: `url-loader`,
			options: {
				name: `[name].[hash:8].[ext]`,
				outputPath: `assets/images/`,
				limit: 1024 * 8,
				esModule: false,
			},
		},
	],
}

const fileLoader = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 1024 * 8,
		name: `[name].[hash:8].[ext]`,
		esModule: false,
	},
}

module.exports = [
	{
		// oneOf: [
		// 	jsxBabelLoader,
		// 	tsxBabelLoader,
		// 	urlFileLoader,
		// 	lessModuleLoader,
		// 	cssModuleLoader,
		// 	lessLoader,
		// 	cssLoader,
		// 	iniFileLoader,
		// 	fileLoader
		// ],
		oneOf: [
			jsxEsbuildLoader,
			tsxEsbuildLoader,
			urlFileLoader,
			lessModuleLoader,
			cssModuleLoader,
			lessLoader,
			cssLoader,
			iniFileLoader,
			fileLoader,
		],
	},
]
