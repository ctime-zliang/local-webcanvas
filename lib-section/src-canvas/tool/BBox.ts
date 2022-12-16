export type TBBoxJSONResult = {
	x: number
	y: number
	w: number
	h: number
}

export class BBox {
	private _x: number
	private _y: number
	private _w: number
	private _h: number
	constructor(x: number, y: number, w: number, h: number) {
		this._x = x
		this._y = y
		this._w = w
		this._h = h
	}

	public updateBBox(x: number, y: number, w: number, h: number) {
		this._x = x
		this._y = y
		this._w = w
		this._h = h
	}

	public toJSON(): TBBoxJSONResult {
		return {
			x: this._x,
			y: this._y,
			w: this._w,
			h: this._h,
		}
	}
}
