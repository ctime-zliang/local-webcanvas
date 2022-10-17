import webCanvas, { GeoCanvas, TGeoCanvas } from '@libcanvas/main'
import { DRAW_GEOMETRY, DRAW_MODE } from '../modules/canvas/config'

export const initCanvasControllerCase = (canvasElement: HTMLCanvasElement): TGeoCanvas => {
	const geoCanvas: TGeoCanvas = new GeoCanvas(canvasElement)
	geoCanvas.init()
	geoCanvas.rerender()
	geoCanvas.setGeometryConstructor(webCanvas.Geometry.Rect)
	console.log(geoCanvas)
	console.log(geoCanvas.getPixCanvasData())
	//@ts-ignore
	window.drawCanvas = geoCanvas
	return geoCanvas
}

export const setDrawModeAction = (canvasContoller: TGeoCanvas, value: string): void => {
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

export const setDrawGeometryAction = (canvasContoller: TGeoCanvas, value: string): void => {
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
