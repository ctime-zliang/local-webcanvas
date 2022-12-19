import { Frame } from './views/Frame'
export class WebCanvas {
	private static iframe: Frame
	private static canvasElement: HTMLCanvasElement

	public static init(canvasElement: HTMLCanvasElement): void {
		this.canvasElement = canvasElement
		this.iframe = new Frame(canvasElement)
	}

	public static getCanvasElement(): HTMLCanvasElement {
		return this.canvasElement
	}
}
