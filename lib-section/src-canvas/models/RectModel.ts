import { RectShape } from '../shapes/RectShape'
import { ShapeBase } from '../shapes/ShapeBase'
import { ModelBase } from './ModelBase'

export class RectModel extends ModelBase {
	private _element: RectShape
	constructor(id: string, layerId: string, x: number, y: number, w: number, h: number) {
		super(id, layerId)
		this._element = new RectShape(x, y, w, h)
	}

	public get element(): ShapeBase {
		return this._element
	}
}
