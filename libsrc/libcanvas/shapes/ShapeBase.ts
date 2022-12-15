import { BBox, TBBoxJSONResult } from '../tool/BBox'

export type ShapeBaseJSONResult = {
	bbox: TBBoxJSONResult,
	centerX: number
	centerY: number
}

export class ShapeBase {
	private _centerX: number
	private _centerY: number
	private _bbox: BBox
	constructor(x: number, y: number) {
		this._centerX = x
		this._centerY = y
	}

	public updateCenter(x: number, y: number) {
		this._centerX = x
		this._centerY = y
	}

	public toJSON(): ShapeBaseJSONResult {
		return {
			bbox: this._bbox.toJSON(),
			centerX: this._centerX,
			centerY: this._centerY
		}
	}
}
