import { TDOMGetBoundingClientRectResult } from '../types/common'
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
		this.viewResizeHandler()
	}

	public get inputInfo(): InputInfo {
		return this._inputInfo
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement
	}

	private viewResizeHandler(): void {
		const inputInfo: InputInfo = this.inputInfo
		const canvasRect: TDOMGetBoundingClientRectResult = this.canvasElement.getBoundingClientRect().toJSON()
		inputInfo.updateCanvasRectSize(this.canvasElement.width, this.canvasElement.height, canvasRect.left, canvasRect.top)
	}

	private keyDownHandler(e: KeyboardEvent): void {
		this.inputInfo.ctrlKey = !!e.ctrlKey
		this.inputInfo.altKey = !!e.altKey
		this.inputInfo.shiftKey = !!e.shiftKey
		this.inputInfo.metaKey = !!e.metaKey
	}

	private keyUpHandler(e: KeyboardEvent): void {
		this.inputInfo.ctrlKey = !!e.ctrlKey
		this.inputInfo.altKey = !!e.altKey
		this.inputInfo.shiftKey = !!e.shiftKey
		this.inputInfo.metaKey = !!e.metaKey
	}

	private mouseDownHandler(e: MouseEvent): void {
		this.inputInfo.mouseDownTimeStamp = e.timeStamp
		this.inputInfo.leftMouseDown = e.button === 0
		this.inputInfo.middleMouseDown = e.button === 1
		this.inputInfo.rightMouseDown = e.button === 2
		this.inputInfo.downX = this.inputInfo.leftMouseDown ? e.clientX : -1
		this.inputInfo.downY = this.inputInfo.leftMouseDown ? e.clientY : -1
	}

	private mouseMoveHandler(e: MouseEvent): void {
		this.inputInfo.mouseX = e.clientX
		this.inputInfo.mouseY = e.clientY
	}

	private mouseUpHandler(e: MouseEvent): void {
		this.inputInfo.leftMouseDown = e.button === 0
		this.inputInfo.middleMouseDown = e.button === 1
		this.inputInfo.rightMouseDown = e.button === 2
	}

	private mouseWheelHandler(e: MouseEvent): void {
		// console.log(e)
	}

	private mouseLeaveHandler(e: MouseEvent): void {
		// console.log(e)
	}

	private mouseEnterHandler(e: MouseEvent): void {
		// console.log(e)
	}

	public bindEvent(): void {
		const canvasElement: HTMLCanvasElement = this.canvasElement
		window.addEventListener('resize', this.viewResizeHandler.bind(this), false)
		canvasElement.addEventListener('keydown', this.keyDownHandler.bind(this), false)
		canvasElement.addEventListener('keyup', this.keyUpHandler.bind(this), false)
		canvasElement.addEventListener('mousedown', this.mouseDownHandler.bind(this), false)
		canvasElement.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false)
		canvasElement.addEventListener('mouseup', this.mouseUpHandler.bind(this), false)
		canvasElement.addEventListener('wheel', this.mouseWheelHandler.bind(this), false)
		canvasElement.addEventListener('mouseleave', this.mouseLeaveHandler.bind(this), false)
		canvasElement.addEventListener('mouseenter', this.mouseEnterHandler.bind(this), false)
	}
}
