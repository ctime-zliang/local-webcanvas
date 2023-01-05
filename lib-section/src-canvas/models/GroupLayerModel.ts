import { GroupLayer } from '../shapes/GroupLayer'
import { TLayerModel } from '../types/layer'

export class GroupLayerModel {
	private _groupId: string
	private _layerId: string
	private _childLayers: Set<TLayerModel>
	private _element: GroupLayer
	constructor(layerId: string, layerName: string) {
		this._groupId = undefined as any
		this._layerId = layerId
		this._childLayers = new Set()
		this._element = new GroupLayer(layerName)
	}

	public get groupId(): string {
		return this._groupId
	}
	public set groupId(value: string) {
		this._groupId = value
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}

	public get childLayers(): Set<TLayerModel> {
		return this._childLayers
	}
	public set childLayers(value: Set<TLayerModel>) {
		this._childLayers = value
	}

	public get element(): GroupLayer {
		return this._element
	}
}
