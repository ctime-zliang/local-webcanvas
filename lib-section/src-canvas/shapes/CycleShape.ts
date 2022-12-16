import { ShapeBase } from './ShapeBase'

export class CycleShape extends ShapeBase {
	private _radius: number
	constructor(x: number, y: number, r: number) {
		super(x, y)
		this._radius = r
	}

	public get radius(): number {
		return this._radius
	}
	public set radius(value: number) {
		this._radius = value
	}
}
