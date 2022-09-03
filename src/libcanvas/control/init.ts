import { GeoCanvas } from '../../../build/libcanvas/libcanvas'
import EventBus from '../../utils/EventBus'
import { EUserActionEventName } from '../config/eventname.enum'
import { initCanvasControllerCase, setDrawGeometryAction, setDrawModeAction } from './action'

const Contorller: { [key: string]: any } = {}

const eventInit = (): void => {
	EventBus.on(EUserActionEventName.InitCanvas, (res: any) => {
		const canvasElement: HTMLCanvasElement = document.getElementById(res.canvasElementId) as HTMLCanvasElement
		Contorller.geoCanvas = initCanvasControllerCase(canvasElement)
	})
	EventBus.on(EUserActionEventName.UpdateDrawMode, (res: any) => {
		setDrawModeAction(Contorller.geoCanvas as GeoCanvas, res.value)
	})
	EventBus.on(EUserActionEventName.UpdateDrawGeometryType, (res: any) => {
		setDrawGeometryAction(Contorller.geoCanvas as GeoCanvas, res.value)
	})
}

export const init = () => {
	eventInit()
}
