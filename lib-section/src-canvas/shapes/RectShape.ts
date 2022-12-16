import { ShapeBase } from './ShapeBase'

export class RectShape extends ShapeBase {
	private _x: number
	private _y: number
	private _w: number
	private _h: number
	constructor(x: number, y: number, w: number, h: number) {
		const centerX: number = x + w / 2
		const centerY: number = y + h / 2
		super(centerX, centerY)
		this._x = x
		this._y = y
		this._w = w
		this._h = h
	}

	public get x(): number {
		return this._x
	}
	public set x(value: number) {
		this._x = value
	}

	public get y(): number {
		return this._y
	}
	public set y(value: number) {
		this._y = value
	}

	public get w(): number {
		return this._w
	}
	public set w(value: number) {
		this._w = value
	}

	public get h(): number {
		return this._h
	}
	public set h(value: number) {
		this._h = value
	}
}
