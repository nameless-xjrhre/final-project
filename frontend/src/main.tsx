import React from 'react'
import ReactDOM from 'react-dom'
import { createClient, Provider } from 'urql'
import { BrowserRouter } from 'react-router-dom'
import serverUrl from './config'
import App from './App'

const client = createClient({
  url: serverUrl,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
