module.exports = {
	DEV_MODE: 'dev',
	PROD_MODE: 'prod',
	devServerConfig: {
		host: '127.0.0.1',
		port: 8080,
	},
	projects: {
		dev: {
			'ui-section': {
				rootPath: '..\\ui-section\\',
				script: 'npm run libcanvasApp:dev',
				router: '/editor',
				buildPath: './dist/libcanvasApp/dev',
				indexPath: './index.html',
			},
			'lib-section': {
				rootPath: '..\\lib-section\\',
				script: 'npm run libcanvas:dev',
				router: '/canvas',
				buildPath: './dist/libcanvas',
				indexPath: './index.html',
			},
		},
		prod: {
			'ui-section': {
				rootPath: '..\\ui-section\\',
				script: 'npm run libcanvasApp:prod',
				router: '/editor',
				buildPath: './dist/libcanvasApp/prod',
				indexPath: './index.html',
			},
			'lib-section': {
				rootPath: '..\\lib-section\\',
				script: 'npm run libcanvas:prod',
				router: '/canvas',
				buildPath: './dist/libcanvas',
				indexPath: './index.html',
			},
		},
	},
}
