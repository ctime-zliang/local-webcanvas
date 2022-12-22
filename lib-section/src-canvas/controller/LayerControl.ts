import { globalIdenManager } from '../Constant'
import { Layer } from '../shapes/Layer'

export class LayerControl {
	private _layers: Array<Layer>
	constructor() {
		this._layers = []
	}

	public getAllLayers(): Array<Layer> {
		return this._layers
	}

	public addLayerItem(layerName: string): string {
		const newLayer: Layer = new Layer(globalIdenManager.getUuIden(), layerName)
		this._layers.push(newLayer)
		return newLayer.layerId
	}
}
