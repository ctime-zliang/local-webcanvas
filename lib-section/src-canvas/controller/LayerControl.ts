import { globalIdenManager } from '../Constant'
import { GroupLayerModel } from '../models/GroupLayerModel'
import { LayerModel } from '../models/LayerModel'
import { TLayerModel } from '../types/layer'

export class LayerControl {
	private _cacheLayers: Set<TLayerModel>
	private _viewLayers: Set<TLayerModel>
	constructor() {
		this._cacheLayers = new Set()
		this._viewLayers = new Set()
	}

	public get cacheLayers(): Set<TLayerModel> {
		return this._cacheLayers
	}
	public set cacheLayers(value: Set<TLayerModel>) {
		this._cacheLayers = value
	}

	public get viewLayers(): Set<TLayerModel> {
		return this._viewLayers
	}
	public set viewLayers(value: Set<TLayerModel>) {
		this._viewLayers = value
	}

	public getAllLayers(groupId?: string): Array<TLayerModel> {
		const arrCacheLayers: Array<TLayerModel> = Array.from(this.cacheLayers)
		if (groupId) {
			const layerItem: GroupLayerModel = arrCacheLayers.find((item: TLayerModel): boolean => {
				return item.layerId === groupId
			}) as GroupLayerModel
			return Array.from(layerItem.childLayers)
		}
		return arrCacheLayers
	}

	public getAllViewLayers(): Array<TLayerModel> {
		return Array.from(this.viewLayers)
	}

	public createLayerItem(layerName: string): LayerModel {
		const newLayer: LayerModel = new LayerModel(globalIdenManager.getUuIden(), layerName)
		this.cacheLayers.add(newLayer)
		this.viewLayers.add(newLayer)
		return newLayer
	}

	public createGroupLayerItem(layerName: string): GroupLayerModel {
		const newGroupLayer: GroupLayerModel = new GroupLayerModel(globalIdenManager.getUuIden(), layerName)
		this.cacheLayers.add(newGroupLayer)
		this.viewLayers.add(newGroupLayer)
		return newGroupLayer
	}

	public deleteLayerItem(layerId: string): void {
		const allLayers: Array<TLayerModel> = this.getAllLayers()
		const layerItem: TLayerModel = allLayers.find((item: TLayerModel): boolean => {
			return item.layerId === layerId
		}) as TLayerModel
		const fromGroupLayerId: string = layerItem.groupId
		if (!fromGroupLayerId) {
			if (layerItem instanceof GroupLayerModel) {
				layerItem.childLayers.forEach((item: TLayerModel): void => {
					this.deleteLayerItem(item.layerId)
				})
				this.cacheLayers.delete(layerItem)
				this.viewLayers.delete(layerItem)
				return
			}
			this.cacheLayers.delete(layerItem)
			this.viewLayers.delete(layerItem)
			return
		}
		const groupLayerItem: GroupLayerModel = allLayers.find((item: TLayerModel): boolean => {
			return item.layerId === fromGroupLayerId
		}) as GroupLayerModel
		if (layerItem instanceof GroupLayerModel) {
			layerItem.childLayers.forEach((item: TLayerModel): void => {
				this.deleteLayerItem(item.layerId)
			})
			groupLayerItem.childLayers.delete(layerItem)
			this.cacheLayers.delete(layerItem)
			return
		}
		groupLayerItem.childLayers.delete(layerItem)
		this.cacheLayers.delete(layerItem)
	}

	public moveLayerItem(layerId: string, groupLayerId?: string, upperLayerId?: string): void {
		if (!groupLayerId && !upperLayerId) {
			return
		}
		const layerItem: LayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
			return item.layerId === layerId
		}) as LayerModel
		const fromGroupLayerId: string = layerItem.groupId
		if (!fromGroupLayerId) {
			this.viewLayers.delete(layerItem)
			if (!groupLayerId) {
				layerItem.groupId = undefined as unknown as string
				if (!upperLayerId) {
					this.viewLayers.add(layerItem)
					return
				}
				const allLayers: Array<TLayerModel> = this.getAllLayers()
				const upperLayerItemIndex: number = allLayers.findIndex((item: TLayerModel): boolean => {
					return item.layerId === upperLayerId
				})
				const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
				allLayers.splice(insertIndex, 0, layerItem)
				this.cacheLayers = new Set(allLayers)
				return
			}
			const groupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
				return item.layerId === groupLayerId
			}) as GroupLayerModel
			layerItem.groupId = groupLayerItem.layerId
			if (!upperLayerId) {
				groupLayerItem.childLayers.add(layerItem)
				return
			}
			const allChildLayers: Array<TLayerModel> = this.getAllLayers(groupLayerItem.layerId)
			const upperLayerItemIndex: number = allChildLayers.findIndex((item: TLayerModel): boolean => {
				return item.layerId === upperLayerId
			})
			const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
			allChildLayers.splice(insertIndex, 0, layerItem)
			groupLayerItem.childLayers = new Set(allChildLayers)
			return
		}
		const oldGroupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
			return item.layerId === groupLayerId
		}) as GroupLayerModel
		oldGroupLayerItem.childLayers.delete(layerItem)
		if (!groupLayerId) {
			layerItem.groupId = undefined as unknown as string
			if (!upperLayerId) {
				this.viewLayers.add(layerItem)
				return
			}
			const allLayers: Array<TLayerModel> = this.getAllLayers()
			const upperLayerItemIndex: number = allLayers.findIndex((item: TLayerModel): boolean => {
				return item.layerId === upperLayerId
			})
			const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
			allLayers.splice(insertIndex, 0, layerItem)
			this.cacheLayers = new Set(allLayers)
			return
		}
		const groupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
			return item.layerId === groupLayerId
		}) as GroupLayerModel
		layerItem.groupId = groupLayerItem.layerId
		if (!upperLayerId) {
			groupLayerItem.childLayers.add(layerItem)
			return
		}
		const allChildLayers: Array<TLayerModel> = this.getAllLayers(groupLayerItem.layerId)
		const upperLayerItemIndex: number = allChildLayers.findIndex((item: TLayerModel): boolean => {
			return item.layerId === upperLayerId
		})
		const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
		allChildLayers.splice(insertIndex, 0, layerItem)
		groupLayerItem.childLayers = new Set(allChildLayers)
	}
}
