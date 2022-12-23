import { WebCanvas } from './Main'
import { initCanvasElement } from './utils/initCanvasElement'

let webCanvas: WebCanvas = undefined as unknown as WebCanvas

function main(): void {
	const canvasElement: HTMLCanvasElement = initCanvasElement('canvas', document.body)
	webCanvas = new WebCanvas(canvasElement)
}
function handleCanvasElementResize(e?: Event): void {
	const canvasElement = webCanvas.canvasElement
	canvasElement.width = document.documentElement.clientWidth
	canvasElement.height = document.documentElement.clientHeight
}
function initEvent(): void {
	window.addEventListener('resize', handleCanvasElementResize)
}

window.addEventListener('DOMContentLoaded', (): void => {
	main()
	handleCanvasElementResize()
	initEvent()

	webCanvas.addLayer()
	webCanvas.addLayer()
	webCanvas.addGroupLayer()
	console.log(webCanvas.getAllLayers())
	console.log(webCanvas)
})
