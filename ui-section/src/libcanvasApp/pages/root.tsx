import React, { useEffect, useRef } from 'react'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const iframeWrapperElementRef = useRef<HTMLDivElement>(null)
	useEffect((): void => {
		if (iframeWrapperElementRef.current) {
			const iframeElement: HTMLIFrameElement = document.createElement('iframe')
			iframeElement.src = '/canvas'
			iframeElement.style.width = '100%'
			iframeElement.style.height = '100%'
			iframeElement.style.border = '0'
			iframeWrapperElementRef.current.appendChild(iframeElement)
		}
	}, [])
	return (
		<>
			<div ref={iframeWrapperElementRef} style={{ width: '100vw', height: '100vh' }}></div>
		</>
	)
}

export default React.memo(Root)
