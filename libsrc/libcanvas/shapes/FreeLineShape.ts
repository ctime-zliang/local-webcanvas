import { T2DShapePositionDot } from "../types/shapes";
import { ShapeBase } from "./ShapeBase";

export class FreeLineShape extends ShapeBase {
    private _path: Array<T2DShapePositionDot>
    private _smooth: boolean
	private _lineWidth: number
    constructor(x: number, y: number) {
		super(0, 0)
		this._path = [{ x, y }]
		this._smooth = false
		this._lineWidth = 10
	}

    public get smooth(): boolean {
		return this._smooth
	}
	public set smooth(value: boolean) {
		this._smooth = value
	}

    public get lineWidth(): number {
		return this._lineWidth
	}
	public set lineWidth(value: number) {
		this._lineWidth = value
	}

    public get path(): Array<T2DShapePositionDot> {
		return this._path
	}
	public set path(value: Array<T2DShapePositionDot>) {
		this._path = value
	}
}