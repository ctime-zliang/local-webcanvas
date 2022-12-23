import { globalIdenManager } from '../Constant'
import { GroupLayerModel } from '../models/GroupLayerModel'
import { LayerModel } from '../models/LayerModel'

export class LayerControl {
	private _layers: Array<LayerModel | GroupLayerModel>
	constructor() {
		this._layers = []
	}

	public getAllLayers(): Array<LayerModel | GroupLayerModel> {
		return this._layers
	}

	public addLayerItem(layerName: string): string {
		const newLayer: LayerModel = new LayerModel(globalIdenManager.getUuIden(), layerName)
		this._layers.push(newLayer)
		return newLayer.layerId
	}

	public addGroupLayerItem(layerName: string): string {
		const newGroupLayer: GroupLayerModel = new GroupLayerModel(globalIdenManager.getUuIden(), layerName)
		this._layers.push(newGroupLayer)
		return newGroupLayer.layerId
	}
}
