import { GroupLayer } from '../shapes/GroupLayer'
import { LayerModel } from './LayerModel'

export class GroupLayerModel {
	private _layerId: string
	private _childLayers: Set<LayerModel>
	private _element: GroupLayer
	constructor(layerId: string, layerName: string) {
		this._layerId = layerId
		this._childLayers = new Set()
		this._element = new GroupLayer(layerName)
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}

	public get childLayers(): Set<LayerModel> {
		return this._childLayers
	}
	public set childLayers(value: Set<LayerModel>) {
		this._childLayers = value
	}

	public get element(): GroupLayer {
		return this._element
	}
}
