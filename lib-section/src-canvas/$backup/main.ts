import { GeoCanvas as _GeoCanvas } from './Scene/GeoCanvas'
import { Circle as _Circle } from './Geometies/Circle'
import { Line as _Line } from './Geometies/Line'
import { Rect as _Rect } from './Geometies/Rect'

export type TGeoCanvas = _GeoCanvas

export const GeoCanvas = _GeoCanvas
export const Geometry = {
	Circle: _Circle,
	Line: _Line,
	Rect: _Rect,
}
export const Circle = _Circle
export const Line = _Line
export const Rect = _Rect

export default {
	GeoCanvas: _GeoCanvas,
	Geometry,
}
