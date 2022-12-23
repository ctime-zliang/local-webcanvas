import { WebCanvas } from './Main'
import { GroupLayerModel } from './models/GroupLayerModel'
import { LayerModel } from './models/LayerModel'
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

	const layerA: LayerModel = webCanvas.createLayerItem()
	const layerB: LayerModel = webCanvas.createLayerItem()
	const layerC: LayerModel = webCanvas.createLayerItem()
	const groupLayerA: GroupLayerModel = webCanvas.createGroupLayerItem()
	webCanvas.moveLayerItemToGroupLayerItem(groupLayerA.layerId, layerB.layerId)
	webCanvas.moveLayerItemToGroupLayerItem(groupLayerA.layerId, layerC.layerId)
	console.log(webCanvas.getAllLayers())
	console.log(webCanvas)
})
