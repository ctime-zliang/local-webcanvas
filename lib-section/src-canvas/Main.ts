import { layerControl } from './Constant'
import { LayerControl } from './controller/LayerControl'
import { SelectControl } from './controller/SelectControl'
import { Control } from './tool/Control'
import { Frame } from './views/Frame'
export class WebCanvas {
	private readonly _control: Control
	private readonly _iframe: Frame
	private readonly _layerControl: LayerControl
	private readonly _canvasElement: HTMLCanvasElement
	private readonly _selectControl: SelectControl
	constructor(canvasElement: HTMLCanvasElement) {
		this._canvasElement = canvasElement
		this._layerControl = layerControl
		this._iframe = new Frame(canvasElement)
		this._selectControl = new SelectControl()
		this._control = new Control(canvasElement)
		this._control.inputInfo.updateCanvasRectSize(canvasElement.width, canvasElement.height)
		this._control.initial()
	}

	public get iframe(): Frame {
		return this._iframe
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement
	}

	public get selectControl(): SelectControl {
		return this._selectControl
	}

	public addLayer(layerName: string = 'Untitled Layer'): void {
		const newLayerId: string = this._layerControl.addLayerItem(layerName)
		this.selectControl.selectedLayersId = [newLayerId]
	}
}
