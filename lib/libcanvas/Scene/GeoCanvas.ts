import { ECanvasState, Scene, TSceneClickFoundRes } from './Scene'

const KEYCODE_DELETE: number = 46
const KEYCODE_CTRL: number = 17

export class GeoCanvas extends Scene {
	private variablesPool: Map<string, any>
	constructor(canvasElement: HTMLCanvasElement) {
		super(canvasElement)
		this.variablesPool = new Map()
		this.variablesPool.set('mouseWheelEventHandler', this.mouseWheelEventHandler.bind(this))
	}

	public init(): void {
		this.initScene()
		this.initGeoCanvas()
	}

	private initGeoCanvas(): void {
		this.bindRightClickEvent()
		this.bindMousedownEvent()
		this.bindMousemoveEvent()
		this.bindMouseupEvent()
		this.bindMouseWheelEvent()
		this.bindKeydownEvent()
		this.bindKeyupEvent()
		this.bindBlurEvent()
	}

	private isOnlyCtrlKeydown(): boolean {
		return this.keyboardState.keys.length === 1 && this.keyboardState.keys[0] === KEYCODE_CTRL
	}

	private bindRightClickEvent(): void {
		this.canvasElement.addEventListener('contextmenu', (evte: MouseEvent): void => {
			// evte.preventDefault()
		})
	}

	private bindMousedownEvent(): void {
		this.canvasElement.addEventListener('mousedown', (evte: MouseEvent): void => {
			evte.stopPropagation()
			this.mouseState.down = true
			this.mouseState.x = evte.offsetX
			this.mouseState.y = evte.offsetY
			Promise.resolve().then((): void => {
				if (evte.button !== 0) {
					return
				}
				/* 绘制模式 */
				if (this.config.state === ECanvasState.DRAWING) {
					let geometryTarget: any = null
					this.mouseState.selectedIndexs = []
					/* 创建图形实例 */
					if (this.geometryConstructor) {
						geometryTarget = new this.geometryConstructor(this.mouseState.x, this.mouseState.y)
						// geometryTarget.setNormalPaintStyle(this.drawSetting.paintBrushState)
						geometryTarget.setAssistSetting({ smooth: this.drawSetting.smooth })
					}
					/* 将新创建的实例标注为鼠标动态跟踪对象  */
					this.mouseState.pointTarget = geometryTarget
					/* 重绘离屏画布 */
					this.clearCanvas(this.offScreen.cacheCanvasCtx)
					for (let i: number = 0; i < this.geometries.length; i++) {
						this.geometries[i].setUnHighlight()
						this.geometries[i].setUnChecked()
						this.geometries[i].draw(this.offScreen.cacheCanvasCtx)
					}
					/* ... */
					this.config.dirty = true
					return
				}
				/* 选择模式 */
				if (this.config.state === ECanvasState.SELECT) {
					/* 查询当前鼠标点击时被选中的几何图元 */
					let targetResult = <TSceneClickFoundRes>this.findClickedTarget(this.mouseState.x, this.mouseState.y)
					if (!targetResult.geometryTarget) {
						/*
							未选中任何几何图元
								将所有几何图元取消高亮
								将鼠标状态修改为"框选工具"状态
						 */
						this.mouseState.selectedIndexs = []
						for (let i: number = 0; i < this.geometries.length; i++) {
							this.geometries[i].setUnChecked()
							this.geometries[i].setUnHighlight()
						}
						this.mouseState.toolTarget = this.tools.boxSelector
						this.mouseState.toolTarget.setStartCoordinate(this.mouseState.x, this.mouseState.y)
					} else {
						const inIndex: number = this.mouseState.selectedIndexs.indexOf(targetResult.geometryTargetIndex)
						if (this.mouseState.selectedIndexs.length >= 2 && inIndex >= 0) {
							/* 选中了处于被选中状态的几何图元 */
							if (this.isOnlyCtrlKeydown()) {
								this.mouseState.selectedIndexs.splice(inIndex, 1)
								targetResult.geometryTarget.setUnChecked()
								targetResult.geometryTarget.setUnHighlight()
							}
						} else {
							if (this.isOnlyCtrlKeydown()) {
								/* (仅)按住 Ctrl 键时交替删除/增加该选中的几何图元 */
								if (inIndex >= 0) {
									this.mouseState.selectedIndexs.splice(inIndex, 1)
									targetResult.geometryTarget.setUnChecked()
									targetResult.geometryTarget.setUnHighlight()
								} else {
									this.mouseState.selectedIndexs.push(targetResult.geometryTargetIndex)
									targetResult.geometryTarget.setChecked()
									targetResult.geometryTarget.setHighlight()
								}
							} else {
								/* 设置仅选中当前被选中的几何图元 */
								this.mouseState.selectedIndexs = [targetResult.geometryTargetIndex]
								for (let i: number = 0; i < this.geometries.length; i++) {
									if (this.mouseState.selectedIndexs[0] === i) {
										continue
									}
									this.geometries[i].setUnChecked()
									this.geometries[i].setUnHighlight()
								}
								targetResult.geometryTarget.setChecked()
								targetResult.geometryTarget.setHighlight()
							}
						}
					}
					/* 重绘离屏画布 */
					this.clearCanvas(this.offScreen.cacheCanvasCtx)
					for (let i: number = 0; i < this.geometries.length; i++) {
						if (this.mouseState.selectedIndexs.includes(i)) {
							continue
						}
						this.geometries[i].draw(this.offScreen.cacheCanvasCtx)
					}
					/* ... */
					this.config.dirty = true
				}
			})
		})
	}

	private bindMousemoveEvent(): void {
		document.addEventListener('mousemove', (evte: MouseEvent): void => {
			evte.stopPropagation()
			if (!this.mouseState.down || this.isOnlyCtrlKeydown()) {
				return
			}
			if (
				evte.clientX - this.config.canvasRect.left <= 0 ||
				evte.clientY - this.config.canvasRect.top <= 0 ||
				evte.clientX >= this.config.canvasRect.right ||
				evte.clientY >= this.config.canvasRect.bottom
			) {
				return
			}
			this.variablesPool.set('moveDistX', evte.offsetX - this.mouseState.x)
			this.variablesPool.set('moveDistY', evte.offsetY - this.mouseState.y)
			this.mouseState.x = evte.offsetX
			this.mouseState.y = evte.offsetY
			this.mouseState.isMove = true
			/* 绘制模式 */
			if (this.config.state === ECanvasState.DRAWING && this.mouseState.pointTarget) {
				this.mouseState.pointTarget.setShapeParameter(this.mouseState.x, this.mouseState.y)
			}
			/* 选择模式 */
			if (this.config.state === ECanvasState.SELECT) {
				if (this.mouseState.toolTarget) {
					this.mouseState.toolTarget.setShapeParameter(this.mouseState.x, this.mouseState.y)
				}
				for (let i: number = this.mouseState.selectedIndexs.length - 1; i >= 0; i--) {
					const geometry = this.geometries[this.mouseState.selectedIndexs[i]]
					geometry.moveDist(this.variablesPool.get('moveDistX'), this.variablesPool.get('moveDistY'))
				}
			}
		})
	}

	private bindMouseupEvent(): void {
		document.addEventListener('mouseup', (evte: MouseEvent): void => {
			evte.stopPropagation()
			if (this.mouseState.down) {
				this.mouseState.isMove = false
				this.mouseState.down = false
				/* 绘制模式 */
				if (this.config.state === ECanvasState.DRAWING && this.mouseState.pointTarget) {
					/* 将当前图形推入存储队列 */
					if (this.mouseState.pointTarget.validate()) {
						this.mouseState.pointTarget.setIndex(this.geometries.length)
						this.geometries.push(this.mouseState.pointTarget)
					}
					this.mouseState.pointTarget = null
					/* 重绘离屏画布 */
					this.clearCanvas(this.offScreen.cacheCanvasCtx)
					for (let i: number = 0; i < this.geometries.length; i++) {
						this.geometries[i].draw(this.offScreen.cacheCanvasCtx)
					}
					/* ... */
					this.config.dirty = false
					return
				}
				/* 选择模式 */
				if (this.config.state === ECanvasState.SELECT) {
					if (this.mouseState.toolTarget) {
						this.mouseState.toolTarget.restoreStatus()
						this.mouseState.toolTarget = null
						this.clearCanvas(this.canvasCtx)
						/* 读取缓存画布图像并绘制输出 */
						this.paintWith(this.canvasCtx, this.offScreen.cacheCanvasElement)
					}
					this.mouseState.pointTarget = null
					/* ... */
					this.config.dirty = false
				}
			}
		})
	}

	private bindMouseWheelEvent(): void {
		this.canvasElement.addEventListener('mousewheel', this.variablesPool.get('mouseWheelEventHandler'))
		this.canvasElement.addEventListener('DOMMouseScroll', this.variablesPool.get('mouseWheelEventHandler'))
	}

	private bindBlurEvent(): void {
		window.addEventListener('blur', (evte: Event): void => {
			this.keyboardState.keys = []
			this.config.dirty = false
		})
	}

	private bindKeydownEvent(): void {
		document.addEventListener('keydown', (evte: KeyboardEvent): void => {
			if (!this.keyboardState.keys.includes(evte.keyCode)) {
				this.keyboardState.keys.push(evte.keyCode)
			}
			/* 删除图形对象 */
			if (evte.keyCode === KEYCODE_DELETE && this.mouseState.selectedIndexs.length) {
				const geometries = []
				for (let i: number = 0; i < this.geometries.length; i++) {
					if (!this.mouseState.selectedIndexs.includes(i)) {
						geometries.push(this.geometries[i])
					}
				}
				this.geometries = geometries
				this.clearCanvas(this.offScreen.cacheCanvasCtx)
				for (let i: number = 0; i < this.geometries.length; i++) {
					this.geometries[i].draw(this.offScreen.cacheCanvasCtx)
				}
				this.config.dirty = true
				this.mouseState.selectedIndexs = []
			}
		})
	}

	private bindKeyupEvent(): void {
		document.addEventListener('keyup', (evte: KeyboardEvent): void => {
			const opKeyIndex: number = this.keyboardState.keys.indexOf(evte.keyCode)
			if (opKeyIndex >= 0) {
				this.keyboardState.keys.splice(opKeyIndex, 1)
			}
			if (!this.mouseState.down && !this.keyboardState.keys.length) {
				this.config.dirty = false
			}
		})
	}

	private mouseWheelEventHandler(evte: Event): void {
		evte.preventDefault()
	}
}
