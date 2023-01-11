import { Layer } from '../shapes/Layer'
import { TGeometryShapeMode } from '../types/shapes'

export class LayerModel {
	private _groupId: string | undefined
	private _layerId: string
	private _element: Layer
	private _payloads: Array<TGeometryShapeMode>
	constructor(layerId: string, layerName: string) {
		this._groupId = undefined as any
		this._layerId = layerId
		this._element = new Layer(layerName)
		this._payloads = []
	}

	public get groupId(): string | undefined {
		return this._groupId
	}
	public set groupId(value: string | undefined) {
		this._groupId = value
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}

	public get element(): Layer {
		return this._element
	}

	public get payloads(): Array<TGeometryShapeMode> {
		return this._payloads
	}
	public set payloads(value: Array<TGeometryShapeMode>) {
		this._payloads = value
	}
}
