import { CycleShape } from '../shapes/CycleShape'
import { ShapeBase } from '../shapes/ShapeBase'
import { ModelBase } from './ModelBase'

export class CycleModel extends ModelBase {
	private _element: CycleShape
	constructor(id: string, layerId: string, x: number, y: number, r: number) {
		super(id, layerId)
		this._element = new CycleShape(x, y, r)
	}

	public get element(): ShapeBase {
		return this._element
	}
}
