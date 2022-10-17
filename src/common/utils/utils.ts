export async function sleep(delay: number = 500, ...args: any): Promise<any> {
	return new Promise(_ => {
		window.setTimeout(() => {
			_(args)
		}, +delay)
	})
}
