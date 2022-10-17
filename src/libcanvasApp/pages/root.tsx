import React from 'react'
import { TCommonComponentBaseProps } from '../types/comm.types'
import CanvasRoot from '../modules/canvas'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	return (
		<>
			<CanvasRoot />
		</>
	)
}

export default React.memo(Root)
