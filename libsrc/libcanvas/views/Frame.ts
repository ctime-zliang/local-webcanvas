import { Scene } from "./Scene"

export class Frame extends Scene {
    private _updateFrame: boolean
    private _canvasFrameId: string
    private _isActive: boolean
    private _canvasElement: HTMLCanvasElement

    constructor(canvasElement: HTMLCanvasElement) {
        super()
        this._canvasElement = canvasElement
        this._updateFrame = false
        this._canvasFrameId = ''
        this._isActive = true
        this.initScene(this._canvasElement.getContext('2d') as CanvasRenderingContext2D)
    }

    public get canvasElement(): HTMLCanvasElement {
        return this._canvasElement
    }

    public get updateFrame(): boolean {
        return this._updateFrame
    }
    public set updateFrame(value: boolean) {
        this._updateFrame = value
    }

    public get canvasFrameId(): string {
        return this._canvasFrameId
    }
    public set canvasFrameId(value: string) {
        this._canvasFrameId = value
    }

    public get isActive(): boolean {
        return this._isActive
    }
    public set isActive(value: boolean) {
        this._isActive = value
    }

    public renderFrame(): void {
        if (this.updateFrame) {
            this.updateFrame = false
            this.render()
        }
    }
}