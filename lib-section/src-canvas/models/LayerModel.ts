import { Layer } from '../shapes/Layer'

export class LayerModel {
	private _layerId: string
	private _element: Layer
	constructor(layerId: string, layerName: string) {
		this._layerId = layerId
		this._element = new Layer(layerName)
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
}
