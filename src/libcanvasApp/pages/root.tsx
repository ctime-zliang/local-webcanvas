import React from 'react'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	return (
		<>
			<div>Canvas Draw Editor</div>
		</>
	)
}

export default React.memo(Root)
