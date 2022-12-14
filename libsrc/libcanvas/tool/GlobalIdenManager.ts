const INIT_IDEN_NUMBER: number = 1
export class GlobalIdenManager {
	private _iden: number
	private _prefix: string
	constructor() {
		this._iden = INIT_IDEN_NUMBER
		this._prefix = 'e'
	}

	public getId(): string {
		return this._prefix + this._iden++
	}
}
