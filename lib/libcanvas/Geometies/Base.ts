import { TCanvasDrawSetting, TGeometryConfig } from '../types/geometry-canvas.types'

export const DEFAULT_NORMAL_DRAW_SETTING: TCanvasDrawSetting = {
	fillStyle: 'rgba(255, 255, 0, 1)',
	lineWidth: 1,
	strokeStyle: 'rgba(0, 0, 0, 1)',
}
export const DEFAULT_HIGHLIGHT_DRAW_SETTING: TCanvasDrawSetting = {
	strokeStyle: 'rgba(255, 0, 0, 255)',
	lineWidth: 5,
	fillStyle: 'rgba(255, 255, 255, 1)',
}

export class GeometryBase {
	private brushConfig: TGeometryConfig
	private highlight: boolean
	private checked: boolean
	private index: number
	private id: string | null
	constructor() {
		this.brushConfig = {
			normal: DEFAULT_NORMAL_DRAW_SETTING,
			highlight: DEFAULT_HIGHLIGHT_DRAW_SETTING,
		}
		this.highlight = false
		this.checked = false
		this.index = -1
		this.id = null
	}

	public setNormalPaintStyle(options: TCanvasDrawSetting): void {
		this.brushConfig.normal = { ...this.brushConfig.normal, ...options }
	}

	public setHighlightPaintStyle(options: TCanvasDrawSetting): void {
		this.brushConfig.highlight = { ...this.brushConfig.highlight, ...options }
	}

	public getPaintStyle(): TCanvasDrawSetting {
		return this.isHighlight() ? this.brushConfig.highlight : this.brushConfig.normal
	}

	public setShapeParameter(x: number, y: number): void {
		/* ... */
	}

	public setAssistSetting(options: any): void {
		/* ... */
	}

	public moveTo(x: number, y: number): void {
		/* ... */
	}

	public moveDist(distX: number, distY: number): void {
		/* ... */
	}

	public choose(x: number, y: number): void {
		/* ... */
	}

	public getOffset(x: number, y: number): void {
		/* ... */
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		/* ... */
	}

	public validate(): void {
		/* ... */
	}

	public setIndex(index: number = -1): void {
		this.index = index
	}

	public getIndex(): number {
		return this.index
	}

	public setChecked(): void {
		this.checked = true
	}

	public setUnChecked(): void {
		this.checked = false
	}

	public isChecked(): boolean {
		return this.checked
	}

	public setHighlight(): void {
		this.highlight = true
	}

	public setUnHighlight(): void {
		this.highlight = false
	}

	public isHighlight(): boolean {
		return this.highlight
	}

	public setId(id: string): void {
		this.id = id
	}

	public getId(): string | null {
		return this.id
	}
}
