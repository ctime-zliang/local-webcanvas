import React, { useEffect, useRef } from 'react'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const iframeWrapperElementRef = useRef<HTMLDivElement>(null)
	useEffect((): void => {
		if (iframeWrapperElementRef.current) {
			const iframeElement: HTMLIFrameElement = document.createElement('iframe')
			iframeElement.src = '/canvas'
			iframeWrapperElementRef.current.appendChild(iframeElement)
		}
	}, [])
	return (
		<>
			<div>Canvas Draw Editor</div>
			<div ref={iframeWrapperElementRef}></div>
		</>
	)
}

export default React.memo(Root)
