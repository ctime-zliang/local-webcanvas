import { Control } from './tool/Control'
import { Frame } from './views/Frame'
import { selectControl, layerControl } from './Constant'
import { Layer } from './shapes/Layer'
import { LayerModel } from './models/LayerModel'
import { GroupLayerModel } from './models/GroupLayerModel'
export class WebCanvas {
	private readonly _control: Control
	private readonly _iframe: Frame
	private readonly _canvasElement: HTMLCanvasElement
	constructor(canvasElement: HTMLCanvasElement) {
		this._canvasElement = canvasElement
		this._iframe = new Frame(canvasElement)
		this._control = new Control(canvasElement)
		this._control.inputInfo.updateCanvasRectSize(canvasElement.width, canvasElement.height)
		this._control.initial()
	}

	public get iframe(): Frame {
		return this._iframe
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement
	}

	public addLayer(layerName: string = 'Untitled Layer'): void {
		const newLayerId: string = layerControl.addLayerItem(layerName)
		selectControl.selectedLayersId = [newLayerId]
	}

	public addGroupLayer(layerName: string = 'Untitled Group-Layer'): void {
		const newGroupLayerId: string = layerControl.addGroupLayerItem(layerName)
		selectControl.selectedLayersId = [newGroupLayerId]
	}

	public getAllLayers(): Array<LayerModel | GroupLayerModel> {
		return layerControl.getAllLayers()
	}
}
