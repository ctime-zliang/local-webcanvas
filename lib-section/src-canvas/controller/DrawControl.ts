import { ModelBase } from '../models/ModelBase'

export class DrawControl {
	private _elements: Set<ModelBase>
	constructor() {
		this._elements = new Set()
	}

	public get elements(): Set<ModelBase> {
		return this._elements
	}
	public set elements(value: Set<ModelBase>) {
		this._elements = value
	}
}
