import { CycleShape } from '../shapes/CycleShape'
import { FreeLineShape } from '../shapes/FreeLineShape'
import { RectShape } from '../shapes/RectShape'

export type TGeometryShape = CycleShape | FreeLineShape | RectShape

export type T2DShapePositionDot = {
	x: number
	y: number
}
