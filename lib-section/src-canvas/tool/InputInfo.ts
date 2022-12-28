import { T2DCoordinatePositionDot } from '../types/canvas'

export abstract class InputContext {
	private _downX: number
	private _downY: number
	private _mouseX: number
	private _mouseY: number
	private _deltaX: number
	private _deltaY: number
	private _shiftKey: boolean
	private _ctrlKey: boolean
	private _altKey: boolean
	private _metaKey: boolean
	private _rightMouseDown: boolean
	private _middleMouseDown: boolean
	private _leftMouseDown: boolean
	private _mouseDownTimeStamp: number
	constructor() {
		this._downX = 0
		this._downY = 0
		this._mouseX = 0
		this._mouseY = 0
		this._deltaX = 0
		this._deltaY = 0
		this._shiftKey = false
		this._ctrlKey = false
		this._altKey = false
		this._metaKey = false
		this._rightMouseDown = false
		this._middleMouseDown = false
		this._leftMouseDown = false
		this._mouseDownTimeStamp = 0
	}

	public get downX(): number {
		return this._downX
	}
	public set downX(value: number) {
		this._downX = value
	}

	public get downY(): number {
		return this._downY
	}
	public set downY(value: number) {
		this._downY = value
	}

	public get mouseX(): number {
		return this._mouseX
	}
	public set mouseX(value: number) {
		this._mouseX = value
	}

	public get mouseY(): number {
		return this._mouseY
	}
	public set mouseY(value: number) {
		this._mouseY = value
	}

	public get deltaX(): number {
		return this._deltaX
	}
	public set deltaX(value: number) {
		this._deltaX = value
	}

	public get deltaY(): number {
		return this._deltaY
	}
	public set deltaY(value: number) {
		this._deltaY = value
	}

	public get shiftKey(): boolean {
		return this._shiftKey
	}
	public set shiftKey(value: boolean) {
		this._shiftKey = value
	}

	public get ctrlKey(): boolean {
		return this._ctrlKey
	}
	public set ctrlKey(value: boolean) {
		this._ctrlKey = value
	}

	public get altKey(): boolean {
		return this._altKey
	}
	public set altKey(value: boolean) {
		this._altKey = value
	}

	public get metaKey(): boolean {
		return this._metaKey
	}
	public set metaKey(value: boolean) {
		this._metaKey = value
	}

	public get rightMouseDown(): boolean {
		return this._rightMouseDown
	}
	public set rightMouseDown(value: boolean) {
		this._rightMouseDown = value
	}

	public get middleMouseDown(): boolean {
		return this._middleMouseDown
	}
	public set middleMouseDown(value: boolean) {
		this._middleMouseDown = value
	}

	public get leftMouseDown(): boolean {
		return this._leftMouseDown
	}
	public set leftMouseDown(value: boolean) {
		this._leftMouseDown = value
	}

	public get mouseDownTimeStamp(): number {
		return this._mouseDownTimeStamp
	}
	public set mouseDownTimeStamp(value: number) {
		this._mouseDownTimeStamp = value
	}
}

export class InputInfo extends InputContext {
	private _canvasWidth: number
	private _canvasHeight: number
	private _canvasLeft: number
	private _canvasTop: number
	private _pointer: Array<T2DCoordinatePositionDot>
	constructor() {
		super()
		this._canvasHeight = 0
		this._canvasWidth = 0
		this._canvasLeft = 0
		this._canvasTop = 0
		this._pointer = []
	}

	public get canvasWidth(): number {
		return this._canvasWidth
	}
	public set canvasWidth(value: number) {
		this._canvasWidth = value
	}

	public get canvasHeight(): number {
		return this._canvasHeight
	}
	public set canvasHeight(value: number) {
		this._canvasHeight = value
	}

	public get canvasLeft(): number {
		return this._canvasLeft
	}
	public set canvasLeft(value: number) {
		this._canvasLeft = value
	}

	public get canvasTop(): number {
		return this.canvasTop
	}
	public set canvasTop(value: number) {
		this._canvasTop = value
	}

	public get pointer(): Array<T2DCoordinatePositionDot> {
		return this._pointer
	}
	public set pointer(value: Array<T2DCoordinatePositionDot>) {
		this._pointer = value
	}

	public updateCanvasRectSize(canvasWidth: number, canvasHeight: number, canvasLeft: number, canvasTop: number): void {
		this.canvasWidth = canvasWidth
		this.canvasHeight = canvasHeight
		this.canvasLeft = canvasLeft
		this.canvasTop = canvasTop
	}
}
