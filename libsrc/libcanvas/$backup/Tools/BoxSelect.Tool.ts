const drawDashLine = (ctx: CanvasRenderingContext2D, [x1, y1]: [number, number], [x2, y2]: [number, number], step = 5): void => {
	const x: number = x2 - x1
	const y: number = y2 - y1
	const count: number = Math.floor(Math.sqrt(x * x + y * y) / step)
	const xv: number = x / count
	const yv: number = y / count
	for (let i: number = 0; i < count; i++) {
		if (i % 2 === 0) {
			ctx.moveTo(x1, y1)
		} else {
			ctx.lineTo(x1, y1)
		}
		x1 += xv
		y1 += yv
	}
	ctx.lineTo(x2, y2)
}

export class BoxSelectTool {
	private brushConfig: { [key: string]: any }
	private x: number
	private y: number
	private w: number
	private h: number
	constructor(x: number, y: number, w: number, h: number) {
		this.brushConfig = {
			fillStyle: 'rgba(255, 255, 255, 0)',
			lineWidth: 0.5,
			strokeStyle: 'rgba(0, 0, 0, 1)',
		}
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	setStartCoordinate(x: number, y: number): void {
		this.x = x + this.brushConfig.lineWidth
		this.y = y + this.brushConfig.lineWidth
	}

	restoreStatus(): void {
		this.x = 0
		this.y = 0
		this.w = 0
		this.h = 0
	}

	setShapeParameter(x: number, y: number): void {
		this.w = x - this.x
		this.h = y - this.y
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath()
		ctx.fillStyle = this.brushConfig.fillStyle
		ctx.strokeStyle = this.brushConfig.strokeStyle
		ctx.lineWidth = this.brushConfig.lineWidth
		this.drawDashRect(ctx, this.x, this.y, this.w, this.h)
		ctx.closePath()
	}

	drawDashRect(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, step: number = 5): void {
		drawDashLine(ctx, [left, top], [left + width, top], step)
		ctx.stroke()
		drawDashLine(ctx, [left + width, top], [left + width, top + height], step)
		ctx.stroke()
		drawDashLine(ctx, [left + width, top + height], [left, top + height], step)
		ctx.stroke()
		drawDashLine(ctx, [left, top + height], [left, top], step)
		ctx.stroke()
	}
}
