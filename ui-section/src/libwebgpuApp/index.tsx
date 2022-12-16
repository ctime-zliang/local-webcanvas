import React from 'react'
import ReactDOM from 'react-dom'
import I18nProvider from './i18n/I18nProvider'
import App from './App'

export function renderReactApp(): void {
	const __render_id__: number = Math.random()
	ReactDOM.render(
		<I18nProvider>
			<App __RenderProps__={{ __render_id__ }} />
		</I18nProvider>,
		document.getElementById('reactApp')
	)
}

renderReactApp()
