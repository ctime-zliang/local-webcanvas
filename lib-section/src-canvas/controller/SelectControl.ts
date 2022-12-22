export class SelectControl {
	private _selectedLayersId: Array<string>
	private _selectedElements: Array<string>
	constructor() {
		this._selectedLayersId = []
		this._selectedElements = []
	}

	public get selectedLayersId(): Array<string> {
		return this._selectedLayersId
	}
	public set selectedLayersId(value: Array<string>) {
		this._selectedLayersId = value
	}

	public get selectedElements(): Array<string> {
		return this._selectedElements
	}
	public set selectedElements(value: Array<string>) {
		this._selectedElements = value
	}
}
