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

	public getLayerItem(layerId: string): TLayerModel {
		const allLayers: Array<TLayerModel> = this.getAllLayers()
		const layerItem: TLayerModel = allLayers.find((item: TLayerModel): boolean => {
			return item.layerId === layerId
		}) as TLayerModel
		return layerItem
	}

	public getAllViewLayers(groupId?: string): Array<TLayerModel> {
		const arrCacheLayers: Array<TLayerModel> = Array.from(this.cacheLayers)
		if (groupId) {
			const layerItem: GroupLayerModel = arrCacheLayers.find((item: TLayerModel): boolean => {
				return item.layerId === groupId
			}) as GroupLayerModel
			return Array.from(layerItem.childLayers)
		}
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

	public modifyLayerName(layerId: string, layerName: string): void {
		const layerItem: TLayerModel = this.getLayerItem(layerId)
		if (!layerItem || !layerName.trim()) {
			return
		}
		layerItem.element.layerName = layerName
	}

	public modifyLayerOpacity(layerId: string, layerOpacity: number): void {
		const layerItem: TLayerModel = this.getLayerItem(layerId)
		if (!layerItem || layerOpacity < 0 || layerOpacity > 1) {
			return
		}
		layerItem.element.layerOpacity = layerOpacity
	}

	public modifyLayerVisible(layerId: string, isVisible: boolean): void {
		const layerItem: TLayerModel = this.getLayerItem(layerId)
		if (!layerItem) {
			return
		}
		layerItem.element.isVisible = !!isVisible
	}

	public deleteLayerItem(layerId: string): void {
		const layerItem: TLayerModel = this.getLayerItem(layerId)
		const fromGroupLayerId: string = layerItem.groupId as string
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
		const groupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
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

	public moveLayerItem(layerId: string, toGroupLayerId?: string, upperLayerId?: string): void {
		const layerItem: TLayerModel = this.getLayerItem(layerId)
		const fromGroupLayerId: string = layerItem.groupId as string
		if (!fromGroupLayerId) {
			this.viewLayers.delete(layerItem)
			if (!toGroupLayerId) {
				layerItem.groupId = undefined
				if (!upperLayerId) {
					this.viewLayers.add(layerItem)
					return
				}
				const allViewLayers: Array<TLayerModel> = this.getAllViewLayers()
				const upperLayerItemIndex: number = allViewLayers.findIndex((item: TLayerModel): boolean => {
					return item.layerId === upperLayerId
				})
				const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
				allViewLayers.splice(insertIndex, 0, layerItem)
				this.viewLayers = new Set(allViewLayers)
				return
			}
			const groupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
				return item.layerId === toGroupLayerId
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
			return item.layerId === fromGroupLayerId
		}) as GroupLayerModel
		oldGroupLayerItem.childLayers.delete(layerItem)
		if (!toGroupLayerId) {
			layerItem.groupId = undefined
			if (!upperLayerId) {
				this.viewLayers.add(layerItem)
				return
			}
			const allViewLayers: Array<TLayerModel> = this.getAllViewLayers()
			const upperLayerItemIndex: number = allViewLayers.findIndex((item: TLayerModel): boolean => {
				return item.layerId === upperLayerId
			})
			const insertIndex: number = upperLayerItemIndex - 1 <= 0 ? 0 : upperLayerItemIndex - 1
			allViewLayers.splice(insertIndex, 0, layerItem)
			this.viewLayers = new Set(allViewLayers)
			return
		}
		const groupLayerItem: GroupLayerModel = this.getAllLayers().find((item: TLayerModel): boolean => {
			return item.layerId === toGroupLayerId
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
