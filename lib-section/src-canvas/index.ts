import { WebCanvas } from './Main'
import { initCanvasElement } from './utils/initCanvasElement'

function main(): void {
	const canvasElement: HTMLCanvasElement = initCanvasElement('canvas', document.body)
	WebCanvas.init(canvasElement)
}
function handleCanvasElementResize(e?: Event): void {
	const canvasElement = WebCanvas.getCanvasElement()
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
	;(window as any).WebCanvas = WebCanvas
})
