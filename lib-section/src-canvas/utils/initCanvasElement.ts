import { TDOMGetBoundingClientRectResult } from '../types/common'

export function initCanvasElement(dataTagName: string, containerElement: HTMLElement): HTMLCanvasElement {
	let canvasElement: HTMLCanvasElement = containerElement.querySelector(`[data-tagitem="${dataTagName}"]`) as HTMLCanvasElement
	if (canvasElement && canvasElement instanceof HTMLCanvasElement) {
		return canvasElement
	}
	const containerClientRect: TDOMGetBoundingClientRectResult = containerElement.getBoundingClientRect()
	canvasElement = document.createElement('canvas')
	canvasElement.width = containerClientRect.width
	canvasElement.height = containerClientRect.height
	canvasElement.style.position = 'absolute'
	canvasElement.setAttribute('data-tagitem', dataTagName)
	containerElement.appendChild(canvasElement)
	return canvasElement
}
