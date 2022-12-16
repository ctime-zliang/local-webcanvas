import { BoxSelectTool } from '../Tools/BoxSelect.Tool'
import { TDOMClientRect, TDOMClientRectJSON } from '../types/dom.types'
import { TCanvasDrawSetting, TCanvasImageDataResult, TGeometryType } from '../types/geometry-canvas.types'

export enum ECanvasState {
	DRAWING = 'DRAWING',
	SELECT = 'SELECT',
}

export type TSceneDrawSetting = {
	paintBrushState: TCanvasDrawSetting
	smooth: boolean
}

export type TSceneTools = {
	boxSelector: BoxSelectTool
}

export type TSceneConfig = {
	state: ECanvasState.DRAWING | ECanvasState.SELECT
	canvasRect: TDOMClientRectJSON
	dirty: boolean
	reDrawByResizeTimer: any
}

export type TSceneoffScreen = {
	cacheCanvasElement: HTMLCanvasElement
	cacheCanvasCtx: CanvasRenderingContext2D | any
}

export type TSceneKeyboardState = {
	keys: Array<number>
}

export type TSceneMouseState = {
	x: number
	y: number
	targetOffsetX: number
	targetOffsetY: number
	selectedIndexs: Array<number>
	down: boolean
	pointTarget: TGeometryType
	toolTarget: TGeometryType
	isMove: boolean
}

export type TSceneClickFoundRes = {
	geometryTarget: TGeometryType
	geometryTargetIndex: number
}

export const DEFAULT_CANVAS_DRAW_SETTING: TCanvasDrawSetting = {
	strokeStyle: '#000000',
	fillStyle: '#ffff00',
	lineWidth: 2,
}

export class Scene {
	protected geometryConstructor: TGeometryType
	protected geometries: Array<TGeometryType>
	protected config: TSceneConfig
	protected tools: TSceneTools
	protected drawSetting: TSceneDrawSetting
	protected mouseState: TSceneMouseState
	protected keyboardState: TSceneKeyboardState
	protected offScreen: TSceneoffScreen
	protected canvasElement: HTMLCanvasElement
	protected canvasCtx: CanvasRenderingContext2D
	constructor(canvasElement: HTMLCanvasElement) {
		if (!canvasElement || canvasElement.nodeName.toUpperCase() !== 'CANVAS') {
			throw new Error(`target dom must be a canvas element.`)
		}
		this.geometryConstructor
		this.geometries
		this.config
		this.tools
		this.drawSetting
		this.mouseState
		this.keyboardState
		this.offScreen
		this.canvasCtx
		this.canvasElement = canvasElement
	}

	public initScene(): void {
		this.bindWindowResizeEvent()
		this.geometryConstructor = null
		this.geometries = []
		this.config = {
			state: ECanvasState.DRAWING,
			canvasRect: this.createCanvasRect(),
			dirty: false,
			reDrawByResizeTimer: null,
		}
		this.tools = this.initTools()
		this.drawSetting = this.initDrawSetting()
		this.mouseState = this.initMouseState()
		this.keyboardState = this.initKeyboardState()
		this.offScreen = this.createOffScreenCanvas()
		this.canvasCtx = this.canvasElement.getContext('2d') as CanvasRenderingContext2D
		this.setCanvasElementRect()
		this.continuedRender()
	}

	private bindWindowResizeEvent(): void {
		window.addEventListener('resize', (evte: Event): void => {
			window.clearTimeout(this.config.reDrawByResizeTimer)
			this.config.reDrawByResizeTimer = window.setTimeout(() => {
				this.config.canvasRect = this.createCanvasRect()
				this.setCanvasElementRect()
				/* 重绘输出画布 */
				this.clearCanvas(this.canvasCtx)
				for (let i: number = this.geometries.length - 1; i >= 0; i--) {
					this.geometries[i].draw(this.canvasCtx)
				}
			}, 300)
		})
	}

	private setCanvasElementRect(rect: { [key: string]: any } = {}): void {
		const canvasRect: TDOMClientRectJSON = { ...this.config.canvasRect, ...rect }
		this.canvasElement.tabIndex = 0
		this.canvasElement.width = canvasRect.width
		this.canvasElement.height = canvasRect.height
		this.offScreen.cacheCanvasElement.width = canvasRect.width
		this.offScreen.cacheCanvasElement.height = canvasRect.height
	}

	private initDrawSetting(): TSceneDrawSetting {
		const paintBrushState: TCanvasDrawSetting = { ...DEFAULT_CANVAS_DRAW_SETTING }
		return {
			paintBrushState,
			smooth: false,
		}
	}

	private initTools(): TSceneTools {
		const boxSelector: BoxSelectTool = new BoxSelectTool(0, 0, 0, 0)
		return {
			boxSelector,
		}
	}

	private initMouseState(): TSceneMouseState {
		return {
			x: -1,
			y: -1,
			targetOffsetX: 0,
			targetOffsetY: 0,
			selectedIndexs: [],
			down: false,
			pointTarget: null,
			toolTarget: null,
			isMove: false,
		}
	}

	private initKeyboardState(): TSceneKeyboardState {
		return {
			keys: [],
		}
	}

	private createCanvasRect(): TDOMClientRectJSON {
		const domRect: TDOMClientRect = this.canvasElement.getBoundingClientRect()
		return domRect.toJSON()
	}

	private createOffScreenCanvas(): TSceneoffScreen {
		const cacheCanvasElement: HTMLCanvasElement = document.createElement('canvas')
		const offScreen: TSceneoffScreen = {
			cacheCanvasElement,
			cacheCanvasCtx: cacheCanvasElement.getContext('2d'),
		}
		/*
            测试 
         */
		// const tc1 = document.getElementById(`t_c_1`)
		// tc1 && (() => { tc1.innerHTML = '' })()
		// tc1 && (() => { tc1.appendChild(offScreen.cacheCanvasElement) })()
		return offScreen
	}

	private continuedRender(): void {
		window.requestAnimationFrame((): void => {
			if (!this.config.dirty) {
				this.continuedRender()
				return
			}
			this.clearCanvas(this.canvasCtx)
			/* 读取缓存画布图像并绘制输出 */
			this.paintWith(this.canvasCtx, this.offScreen.cacheCanvasElement)
			if (this.mouseState.toolTarget) {
				this.mouseState.toolTarget.draw(this.canvasCtx)
			}
			if (this.mouseState.pointTarget) {
				this.mouseState.pointTarget.draw(this.canvasCtx)
			}
			for (let i: number = this.mouseState.selectedIndexs.length - 1; i >= 0; i--) {
				const geometry: TGeometryType = this.geometries[this.mouseState.selectedIndexs[i]]
				// if (geometry === this.mouseState.pointTarget) {
				//     continue
				// }
				geometry.draw(this.canvasCtx)
			}
			this.continuedRender()
		})
	}

	private rerenderWith(ctx: CanvasRenderingContext2D, geometries: Array<TGeometryType> = []): void {
		const _geometries: Array<TGeometryType> = geometries.length ? geometries : this.geometries
		this.clearCanvas(ctx)
		for (let i: number = 0; i < _geometries.length; i++) {
			_geometries[i].draw(ctx)
		}
	}

	public getPixCanvasData(): TCanvasImageDataResult {
		return this.canvasCtx.getImageData(
			this.config.canvasRect.left,
			this.config.canvasRect.top,
			this.config.canvasRect.width,
			this.config.canvasRect.height
		)
	}

	public rerender(): void {
		this.rerenderWith(this.offScreen.cacheCanvasCtx)
		this.rerenderWith(this.canvasCtx)
	}

	public getDrawSetting(): TSceneDrawSetting {
		return JSON.parse(JSON.stringify(this.drawSetting))
	}

	public setDrawSetting(drawSetting: TSceneDrawSetting): void {
		this.drawSetting = JSON.parse(JSON.stringify(drawSetting))
	}

	public setGeometryConstructor(geometryConstructor: any): void {
		this.geometryConstructor = geometryConstructor
	}

	public toggleStateToDrawing(): void {
		this.config.state = ECanvasState.DRAWING
	}

	public toggleStateToSelect(): void {
		this.config.state = ECanvasState.SELECT
	}

	public clearAllGeometries(): void {
		// this.geometries = []
		this.geometries.length = 0
	}

	public removeGeometry(index: number): void {
		if (String(+index) === 'NaN' || index < 0) {
			return
		}
		this.geometries.splice(index, 1)
	}

	public addGeometry(geometry: TGeometryType): void {
		this.geometries.push(geometry)
	}

	public pushGeometries(geometries: Array<TGeometryType>): void {
		geometries.forEach((item: TGeometryType) => {
			this.geometries.push(item)
		})
	}

	public clearCanvas(ctx: CanvasRenderingContext2D): void {
		ctx.clearRect(0, 0, this.config.canvasRect.width, this.config.canvasRect.height)
	}

	public paintWith(ctx: CanvasRenderingContext2D, sourceCanvas: HTMLCanvasElement, x = 0, y = 0): void {
		ctx.drawImage(sourceCanvas, x, y, this.config.canvasRect.width, this.config.canvasRect.height)
	}

	public findClickedTarget(x: number, y: number): TSceneClickFoundRes {
		let geometryTarget: TGeometryType = null
		let geometryTargetIndex: number = -1
		for (let i: number = this.geometries.length - 1; i >= 0; i--) {
			if (this.geometries[i].choose(x, y) && !geometryTarget) {
				geometryTarget = this.geometries[i]
				geometryTargetIndex = i
				break
			}
		}
		return {
			geometryTarget,
			geometryTargetIndex,
		}
	}
}
