import { CycleShape } from '../shapes/CycleShape'
import { ShapeBase } from '../shapes/ShapeBase'

export class CycleModel {
	private _id: string
	private _layerId: string
	private _element: CycleShape
	constructor(layerId: string, x: number, y: number, r: number) {
		this._layerId = layerId
		this._element = new CycleShape(x, y, r)
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

	public get element(): ShapeBase {
		return this._element
	}
}
