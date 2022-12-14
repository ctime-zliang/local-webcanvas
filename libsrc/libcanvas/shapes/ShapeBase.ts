import { BBox } from '../tool/BBox'

export class ShapeBase {
	private _centerX: number
	private _centerY: number
	private _bbox: BBox
	constructor(x: number, y: number) {
		this._centerX = x
		this._centerY = y
	}

	public get centerX(): number {
		return this._centerX
	}
	public set centerX(value: number) {
		this._centerX = value
	}

	public get centerY(): number {
		return this._centerY
	}
	public set centerY(value: number) {
		this._centerY = value
	}

	public get bbox(): BBox {
		return this._bbox
	}
	public set bbox(value: BBox) {
		this._bbox = value
	}
}
