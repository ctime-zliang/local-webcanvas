import React from 'react'
import ReactDOMClient from 'react-dom/client'
import I18nProvider from './i18n/I18nProvider'
import App from './App'

export function renderReactApp(): void {
	const __render_id__: number = Math.random()
	ReactDOMClient.createRoot(document.getElementById('reactApp') as HTMLElement).render(
		<I18nProvider>
			<App __RenderProps__={{ __render_id__ }} />
		</I18nProvider>
	)
}

renderReactApp()
