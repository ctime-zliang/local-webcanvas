import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function renderApp(): void {
	ReactDOM.render(<App />, document.getElementById('app'))
}

renderApp()
