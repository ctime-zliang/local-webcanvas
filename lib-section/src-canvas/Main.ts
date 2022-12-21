import { Control } from './tool/Control'
import { Frame } from './views/Frame'
export class WebCanvas {
	private static _control: Control
	private static _iframe: Frame
	private static _canvasElement: HTMLCanvasElement

	public static init(canvasElement: HTMLCanvasElement): void {
		this._canvasElement = canvasElement
		this._iframe = new Frame(canvasElement)
		this._control = new Control(canvasElement)
		this._control.inputInfo.updateCanvasRectSize(canvasElement.width, canvasElement.height)
		this._control.initial()
	}

	public static getCanvasElement(): HTMLCanvasElement {
		return this._canvasElement
	}

	public static getIframe(): Frame {
		return this._iframe
	}
}
