import { RectShape } from '../shapes/RectShape'
import { ShapeBase } from '../shapes/ShapeBase'

export class RectModel {
	private _id: string
	private _layerId: string
	private _element: RectShape
	constructor(layerId: string, x: number, y: number, w: number, h: number) {
		this._layerId = layerId
		this._element = new RectShape(x, y, w, h)
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
