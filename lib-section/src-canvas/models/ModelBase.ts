export class ModelBase {
	private _id: string
	private _layerId: string
	constructor(id: string, layerId: string) {
		this._id = id
		this._layerId = layerId
	}

	public get id(): string {
		return this._id
	}
	public set id(value: string) {
		this._id = value
	}

	public get layerId(): string {
		return this._layerId
	}
	public set layerId(value: string) {
		this._layerId = value
	}
}
