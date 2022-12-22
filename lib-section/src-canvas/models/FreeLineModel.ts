import { FreeLineShape } from '../shapes/FreeLineShape'
import { ShapeBase } from '../shapes/ShapeBase'

export class FreeLineModel {
	private _id: string
	private _layerId: string
	private _element: FreeLineShape
	constructor(layerId: string, x: number, y: number) {
		this._layerId = layerId
		this._element = new FreeLineShape(x, y)
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
