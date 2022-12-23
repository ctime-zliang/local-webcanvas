export class GroupLayer {
	private _layerName: string
	private _layerOpacity: number
	constructor(layerName: string) {
		this._layerName = layerName
		this._layerOpacity = 1
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
