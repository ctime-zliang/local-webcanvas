export class Layer {
	private _layerId: string
	private _layerName: string
	private _layerOpacity: number
	constructor(layerId: string, layerName: string) {
		this._layerId = layerId
		this._layerName = layerName
		this._layerOpacity = 1
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}

	public get layerName(): string {
		return this._layerName
	}
	public set layerName(value: string) {
		this._layerName = value
	}

	public get layerOpacity(): number {
		return this._layerOpacity
	}
	public set layerOpacity(value: number) {
		this._layerOpacity = value
	}
}
