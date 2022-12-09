import React from 'react'
import '../../node_modules/antd/dist/antd.css'
import favicon from '@/common/assets/images/log.jpg'
import { TCommonComponentBaseProps } from './types/comm.types'

export default function App(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`App ☆☆☆`, props)
	const __app_id__: number = Math.random()
	return (
		<section data-tagitem="React-App-Section" className="react-app-section">
			React WebGPU Application
		</section>
	)
}
