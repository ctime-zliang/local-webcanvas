import { GroupLayer } from '../shapes/GroupLayer'

export class GroupLayerModel {
	private _layerId: string
	private _childLayerIds: Array<string>
	private _element: GroupLayer
	constructor(layerId: string, layerName: string) {
		this._layerId = layerId
		this._childLayerIds = []
		this._element = new GroupLayer(layerName)
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}

	public get childLayerIds(): Array<string> {
		return this._childLayerIds
	}
	public set childLayerIds(value: Array<string>) {
		this._childLayerIds = value
	}

	public get element(): GroupLayer {
		return this._element
	}
}
