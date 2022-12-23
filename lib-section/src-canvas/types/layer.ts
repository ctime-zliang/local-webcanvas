import { GroupLayerModel } from '../models/GroupLayerModel'
import { LayerModel } from '../models/LayerModel'
import { GroupLayer } from '../shapes/GroupLayer'
import { Layer } from '../shapes/Layer'

export type TLayerShape = Layer | GroupLayer
export type TLayerModel = LayerModel | GroupLayerModel
