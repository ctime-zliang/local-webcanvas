export class Scene {
    private _versn: string
    private _ctx: CanvasRenderingContext2D
    constructor() {
        this._versn = '1.0.1'
        this._ctx = null as any
    }

    public get versn(): string {
        return this._versn
    }
    public set versn(value: string) {
        this._versn = value
    }

    public get ctx(): CanvasRenderingContext2D {
        return this._ctx
    }
    public set ctx(value: CanvasRenderingContext2D) {
        this._ctx = value
    }

    public initScene(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx
    }

    public getImageData(sx: number = 0, sy: number = 0, sw: number = 0, sh: number = 0): ImageData {
        return this.ctx.getImageData(sx, sy, sw, sh)
    }

    public render(): void {
        console.log(`render canvas...`)
    }
}