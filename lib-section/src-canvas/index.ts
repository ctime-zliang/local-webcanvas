import { WebCanvas } from './Main'
import { initCanvasElement } from './utils/initCanvasElement'

function main(): void {
	const canvasElement: HTMLCanvasElement = initCanvasElement('canvas', document.body)
	WebCanvas.init(canvasElement)
}
function initEvent(): void {
	window.addEventListener('resize', (): void => {
		const canvasElement = WebCanvas.getCanvasElement()
		canvasElement.width = document.documentElement.clientWidth
		canvasElement.height = document.documentElement.clientHeight
	})
}

window.addEventListener('DOMContentLoaded', (): void => {
	main()
	initEvent()
})
