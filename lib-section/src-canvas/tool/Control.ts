import { InputInfo } from './InputInfo'

export class Control {
	private readonly _inputInfo: InputInfo
	constructor() {
		this._inputInfo = new InputInfo()
	}

	public get inputInfo(): InputInfo {
		return this._inputInfo
	}
}
