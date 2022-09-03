import webCanvas, { GeoCanvas } from '../../../build/libcanvas/libcanvas'
import { DRAW_GEOMETRY, DRAW_MODE } from '../modules/main/config'

export const initCanvasControllerCase = (canvasElement: HTMLCanvasElement): GeoCanvas => {
	const geoCanvas: GeoCanvas = new GeoCanvas(canvasElement)
	geoCanvas.init()
	geoCanvas.rerender()
	geoCanvas.setGeometryConstructor(webCanvas.Geometry.Rect)
	console.log(geoCanvas)
	console.log(geoCanvas.getPixCanvasData())
	//@ts-ignore
	window.drawCanvas = geoCanvas
	return geoCanvas
}

export const setDrawModeAction = (canvasContoller: GeoCanvas, value: string): void => {
	switch (value) {
		case DRAW_MODE.DRAW: {
			canvasContoller.toggleStateToDrawing()
			break
		}
		case DRAW_MODE.SELECT: {
			canvasContoller.toggleStateToSelect()
			break
		}
	}
}

export const setDrawGeometryAction = (canvasContoller: GeoCanvas, value: string): void => {
	switch (value) {
		case DRAW_GEOMETRY.CIRCLE: {
			canvasContoller.setGeometryConstructor(webCanvas.Geometry.Circle)
			break
		}
		case DRAW_GEOMETRY.RECT: {
			canvasContoller.setGeometryConstructor(webCanvas.Geometry.Rect)
			break
		}
		case DRAW_GEOMETRY.LINE: {
			canvasContoller.setGeometryConstructor(webCanvas.Geometry.Line)
			break
		}
	}
}
