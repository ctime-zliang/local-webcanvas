const path = require('path')
const utils = require('../utils/utils')

function DtsBundlePlugin(opt) {
	this.options = { ...opt }
}
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.hooks.done.tap('done', async () => {
		console.log(`\n`)
		console.log('Building typescript type declaration file...')
		const dts = require('dts-bundle')
		dts.bundle({
			name: this.options.name,
			baseDir: this.options.rootPath,
			main: path.join(this.options.rootPath, this.options.entry),
			out: path.join(this.options.rootPath, this.options.output),
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true,
		})
	})
	compiler.hooks.done.tap('finish', () => {
		console.log(`\n`)
		console.log('Cleaning up temporary directory...')
		utils.deleteFolderRecursive(this.options.rootPath)
		console.log('Build successful!')
	})
}

module.exports = {
	DtsBundlePlugin,
}
