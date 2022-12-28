import { FreeLineShape } from '../shapes/FreeLineShape'
import { ShapeBase } from '../shapes/ShapeBase'
import { ModelBase } from './ModelBase'

export class FreeLineModel extends ModelBase {
	private _element: FreeLineShape
	constructor(id: string, layerId: string, x: number, y: number) {
		super(id, layerId)
		this._element = new FreeLineShape(x, y)
	}

	public get element(): ShapeBase {
		return this._element
	}
}
