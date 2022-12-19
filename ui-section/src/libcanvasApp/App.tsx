import React from 'react'
import '../common/assets/style/prefix.less'
import '../../node_modules/antd/dist/antd.css'
import Root from './pages/root'
import { TCommonComponentBaseProps } from './types/comm.types'

export default function App(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`App ☆☆☆`, props)
	const __app_id__: number = Math.random()
	return (
		<section data-tagitem="React-App-Section" className="react-app-section">
			<Root __AppProps__={{ __app_id__ }} {...props} />
		</section>
	)
}
