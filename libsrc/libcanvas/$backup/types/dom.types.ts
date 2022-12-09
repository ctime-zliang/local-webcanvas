export type TDOMClientRectJSON = {
	width: number
	height: number
	x: number
	y: number
	left: number
	top: number
	bottom: number
	right: number
}
export type TDOMClientRect = {
	width: number
	height: number
	x: number
	y: number
	left: number
	top: number
	bottom: number
	right: number
	toJSON: () => TDOMClientRectJSON
}
