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

	const layerA: LayerModel = webCanvas.createLayerItem('Layer A')
	const layerB: LayerModel = webCanvas.createLayerItem('Layer B')
	const layerC: LayerModel = webCanvas.createLayerItem('Layer C')
	const groupLayerA: GroupLayerModel = webCanvas.createGroupLayerItem('Layer Group A')
	webCanvas.moveLayerItem(layerB.layerId, groupLayerA.layerId)
	webCanvas.moveLayerItem(layerC.layerId, groupLayerA.layerId)
	const layerD: LayerModel = webCanvas.createLayerItem('Layer D')
	const groupLayerB: GroupLayerModel = webCanvas.createGroupLayerItem('Layer Group B')
	webCanvas.moveLayerItem(layerD.layerId, groupLayerB.layerId)
	webCanvas.moveLayerItem(groupLayerB.layerId, groupLayerA.layerId)

	// webCanvas.deleteLayerItem(groupLayerA.layerId)
	webCanvas.moveLayerItem(groupLayerB.layerId, groupLayerB.groupId, layerB.layerId)
	webCanvas.moveLayerItem(layerD.layerId, groupLayerA.layerId)
	webCanvas.deleteLayerItem(groupLayerA.layerId)

	console.log(webCanvas.getAllLayers())
	console.log(webCanvas.getAllViewLayers())
	console.log(webCanvas)
})
