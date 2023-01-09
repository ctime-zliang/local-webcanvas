import { GlobalIdenManager } from './tool/GlobalIdenManager'
import { LayerControl } from './controller/LayerControl'
import { SelectControl } from './controller/SelectControl'
import { EventBus } from './utils/EventBus'

export const globalIdenManager: GlobalIdenManager = new GlobalIdenManager()
export const layerControl: LayerControl = new LayerControl()
export const selectControl: SelectControl = new SelectControl()
export const eventBus: EventBus = new EventBus()
