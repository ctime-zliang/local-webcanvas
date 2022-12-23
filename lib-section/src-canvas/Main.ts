import { Control } from './tool/Control'
import { Frame } from './views/Frame'
import { selectControl, layerControl } from './Constant'
import { LayerModel } from './models/LayerModel'
import { GroupLayerModel } from './models/GroupLayerModel'
import { TLayerModel } from './types/layer'
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

	public createLayerItem(layerName: string = 'Untitled Layer'): LayerModel {
		const newLayer: LayerModel = layerControl.createLayerItem(layerName)
		selectControl.selectedLayersId = new Set([newLayer.layerId])
		return newLayer
	}

	public createGroupLayerItem(layerName: string = 'Untitled Group-Layer'): GroupLayerModel {
		const newGroupLayer: GroupLayerModel = layerControl.createGroupLayerItem(layerName)
		selectControl.selectedLayersId = new Set([newGroupLayer.layerId])
		return newGroupLayer
	}

	public getAllLayers(): Array<TLayerModel> {
		return layerControl.getAllLayers()
	}

	public moveLayerItemToGroupLayerItem(groupLayerId: string, childLayerId: string): void {
		layerControl.moveLayerItemToGroupLayerItem(groupLayerId, childLayerId)
	}
}
