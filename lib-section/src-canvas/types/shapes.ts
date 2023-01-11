import { CycleModel } from '../models/CycleModel'
import { FreeLineModel } from '../models/FreeLineModel'
import { RectModel } from '../models/RectModel'
import { CycleShape } from '../shapes/CycleShape'
import { FreeLineShape } from '../shapes/FreeLineShape'
import { RectShape } from '../shapes/RectShape'

export type TGeometryShape = CycleShape | FreeLineShape | RectShape

export type TGeometryShapeMode = CycleModel | FreeLineModel | RectModel

export type T2DShapePositionDot = {
	x: number
	y: number
}
