import { InputInfo } from './InputInfo'

export class Control {
	private readonly _canvasElement: HTMLCanvasElement
	private readonly _inputInfo: InputInfo
	constructor(canvasElement: HTMLCanvasElement) {
		this._canvasElement = canvasElement
		this._inputInfo = new InputInfo()
	}

	public initial(): void {
		this.bindEvent()
	}

	public get inputInfo(): InputInfo {
		return this._inputInfo
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement
	}

	private viewResizeHandler(): void {
		const inputInfo: InputInfo = this.inputInfo
		inputInfo.updateCanvasRectSize(this.canvasElement.width, this.canvasElement.height)
	}

	private keyDownHandler(e: KeyboardEvent): void {
		console.log(e)
	}

	private keyUpHandler(e: KeyboardEvent): void {
		console.log(e)
	}

	private mouseDownHandler(e: MouseEvent): void {
		console.log(e)
	}

	private mouseMoveHandler(e: MouseEvent): void {
		// console.log(e)
	}

	private mouseUpHandler(e: MouseEvent): void {
		console.log(e)
	}

	private mouseWheelHandler(e: MouseEvent): void {
		console.log(e)
	}

	private mouseLeaveHandler(e: MouseEvent): void {
		console.log(e)
	}

	private mouseEnterHandler(e: MouseEvent): void {
		console.log(e)
	}

	public bindEvent(): void {
		const canvasElement: HTMLCanvasElement = this.canvasElement
		window.addEventListener('resize', this.viewResizeHandler.bind(this), false)
		canvasElement.addEventListener('keydown', this.keyDownHandler, false)
		canvasElement.addEventListener('keyup', this.keyUpHandler, false)
		canvasElement.addEventListener('mousedown', this.mouseDownHandler, false)
		canvasElement.addEventListener('mousemove', this.mouseMoveHandler, false)
		canvasElement.addEventListener('mouseup', this.mouseUpHandler, false)
		canvasElement.addEventListener('wheel', this.mouseWheelHandler, false)
		canvasElement.addEventListener('mouseleave', this.mouseLeaveHandler, false)
		canvasElement.addEventListener('mouseenter', this.mouseEnterHandler, false)
	}
}
