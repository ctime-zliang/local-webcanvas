const koa = require('koa')
const koaCors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const config = require('./src/config')
const { getProjects, execScripts } = require('./src/script')
const router = require('./src/router')

const startApp = () => {
	const app = new koa()

	app.$BUILD_MODE = null

	app.use(
		koaCors({
			origin(ctx) {
				return ctx.header.origin
			},
			exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
			credentials: true,
			allowMethods: ['GET', 'POST', 'DELETE'],
			allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
		})
	)
	app.use(bodyParser())
	app.use(async (ctx, next) => {
		if (app.$BUILD_MODE) {
			router(ctx, next, app.$BUILD_MODE)
			return
		}
		await next()
	})
	app.on('error', (error, ctx) => {
		console.log(error, ctx)
	})

	app.listen(config.devServerConfig.port, config.devServerConfig.host, async () => {
		console.log(`Server Started. http://${config.devServerConfig.host}:${config.devServerConfig.port}`)
	})

	const projects = getProjects(process.argv)
	app.$BUILD_MODE = projects.mode
	execScripts(projects)

	return app
}

module.exports = startApp()
