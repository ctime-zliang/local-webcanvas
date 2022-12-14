import { initCanvasElement } from './utils/initCanvasElement'
import { Frame } from './views/Frame'

const frame: Frame = new Frame(initCanvasElement('drawCanvas', document.body))
