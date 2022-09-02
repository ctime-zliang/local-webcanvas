const path = require('path')

const jsEsbuildLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
		tsconfigRaw: require('../../tsconfig.libwebgl-build.json'),
	},
}

const tsLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'ts-loader',
	options: {
		configFile: 'tsconfig.libwebgl-build.json',
		// configFile: path.resolve(process.cwd(), './tsconfig.libwebgl-build.json')
	},
}

module.exports = type => {
	return {
		libProdBuild: {
			oneOf: [jsEsbuildLoader, tsLoader],
		},
		libDevBuild: {
			oneOf: [jsEsbuildLoader, tsLoader],
		},
	}[type]
}
