import { Frame } from './views/Frame'

export class WebCanvas {
	private _frame: Frame
	private _canvasElement: HTMLCanvasElement
	constructor(canvasElement: HTMLCanvasElement) {
		this._canvasElement = canvasElement
		this._frame = new Frame(this._canvasElement)
	}

	public get frame(): Frame {
		return this._frame
	}
}

console.log(WebCanvas)
