import { Circle } from '../Geometies/Circle'
import { Line } from '../Geometies/Line'
import { Rect } from '../Geometies/Rect'

export type TCanvasDrawSetting = {
	fillStyle: string
	lineWidth: number
	strokeStyle: string
}

/************************ ************************/
/************************ ************************/

export type TPosition2D = {
	x: number
	y: number
}

/************************ ************************/
/************************ ************************/

export type TGeometryOffset = {
	distX: number
	distY: number
}

/************************ ************************/
/************************ ************************/

export type TGeometryType = Circle | Line | Rect | any

/************************ ************************/
/************************ ************************/

export type TGeometryAssistSetting = {
	smooth?: boolean
}

/************************ ************************/
/************************ ************************/

export type TGeometryConfig = {
	normal: TCanvasDrawSetting
	highlight: TCanvasDrawSetting
}

/************************ ************************/
/************************ ************************/

export type TCanvasImageDataResult = {
	data: any
	width?: number
	height?: number
	colorSpace?: string
	storageFormat?: string
}
