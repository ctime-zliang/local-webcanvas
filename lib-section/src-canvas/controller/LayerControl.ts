import { globalIdenManager } from '../Constant'
import { GroupLayerModel } from '../models/GroupLayerModel'
import { LayerModel } from '../models/LayerModel'
import { TLayerModel } from '../types/layer'

export class LayerControl {
	private _layers: Set<TLayerModel>
	constructor() {
		this._layers = new Set()
	}

	public get layers(): Set<TLayerModel> {
		return this._layers
	}

	public getAllLayers(): Array<TLayerModel> {
		return Array.from(this._layers)
	}

	public createLayerItem(layerName: string): LayerModel {
		const newLayer: LayerModel = new LayerModel(globalIdenManager.getUuIden(), layerName)
		this.layers.add(newLayer)
		return newLayer
	}

	public createGroupLayerItem(layerName: string): GroupLayerModel {
		const newGroupLayer: GroupLayerModel = new GroupLayerModel(globalIdenManager.getUuIden(), layerName)
		this.layers.add(newGroupLayer)
		return newGroupLayer
	}

	public moveLayerToGroupLayer(groupLayerId: string, childLayerId: string): void {
		const groupLayerItem: GroupLayerModel = Array.from(this.layers).find((item: TLayerModel): boolean => {
			return item.layerId === groupLayerId
		}) as GroupLayerModel
		const layerItem: LayerModel = Array.from(this.layers).find((item: TLayerModel): boolean => {
			return item.layerId === childLayerId
		}) as LayerModel
		if (!groupLayerItem || !layerItem) {
			return
		}
		groupLayerItem.childLayers.add(layerItem)
	}
}
