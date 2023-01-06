export class Layer {
	private _layerName: string
	private _layerOpacity: number
	private _isVisible: boolean
	constructor(layerName: string) {
		this._layerName = layerName
		this._layerOpacity = 1
		this._isVisible = true
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

	public get isVisible(): boolean {
		return this._isVisible
	}
	public set isVisible(value: boolean) {
		this._isVisible = value
	}
}
