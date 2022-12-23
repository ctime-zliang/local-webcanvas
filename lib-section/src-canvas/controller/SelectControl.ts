export class SelectControl {
	private _selectedLayersId: Set<string>
	private _selectedElements: Set<string>
	constructor() {
		this._selectedLayersId = new Set()
		this._selectedElements = new Set()
	}

	public get selectedLayersId(): Set<string> {
		return this._selectedLayersId
	}
	public set selectedLayersId(value: Set<string>) {
		this._selectedLayersId = value
	}

	public get selectedElements(): Set<string> {
		return this._selectedElements
	}
	public set selectedElements(value: Set<string>) {
		this._selectedElements = value
	}
}
