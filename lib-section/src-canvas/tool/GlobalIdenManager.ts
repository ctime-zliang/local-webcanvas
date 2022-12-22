import { getUuid } from '../utils/getUuid'

const INIT_IDEN_NUMBER: number = 1
export class GlobalIdenManager {
	private _elementIden: number
	private _prefix: string
	constructor() {
		this._elementIden = INIT_IDEN_NUMBER
		this._prefix = 'e'
	}

	public getElementIden(): string {
		return this._prefix + this._elementIden++
	}

	public getUuIden(length: number = 36): string {
		return getUuid(length)
	}
}
