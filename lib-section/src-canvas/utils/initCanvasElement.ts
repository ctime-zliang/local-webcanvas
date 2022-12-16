export function initCanvasElement(dataTagName: string, containerElement: HTMLElement): HTMLCanvasElement {
	let canvasElement: HTMLCanvasElement = containerElement.querySelector(`[data-tagitem="${dataTagName}"]`) as HTMLCanvasElement
	if (canvasElement && canvasElement instanceof HTMLCanvasElement) {
		return canvasElement
	}
	canvasElement = document.createElement('canvas')
	canvasElement.style.width = '100%'
	canvasElement.style.height = '100%'
	canvasElement.setAttribute('data-tagitem', dataTagName)
	containerElement.appendChild(canvasElement)
	return canvasElement
}
