import { WebCanvas as _WebCanvas } from './Main'

const WebCanvas = _WebCanvas
export type WebCanvas = _WebCanvas
export default WebCanvas

/**
 * test
 */
const canvasElement: HTMLCanvasElement = document.createElement('canvas')
canvasElement.width = 500
canvasElement.height = 300
canvasElement.id = String(Math.random())
document.getElementById('app')?.appendChild(canvasElement)
const webCanvas: WebCanvas = new WebCanvas(canvasElement)
webCanvas.frame.render()
console.log(webCanvas)
console.log(canvasElement)
