import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux/es/exports'
import './18n'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter basename="/React_news">
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
)
