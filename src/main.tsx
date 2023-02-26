import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom';
import store from './redux/store'
import { Provider } from 'react-redux/es/exports'
import { Audio, InfinitySpin } from 'react-loader-spinner'
import './18n'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    {/* <BrowserRouter basename="/React_news"> */}
    <HashRouter>
      {/* <HashRouter basename="/React_news"> */}
      <Suspense fallback={
        <div
          style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        >
          <InfinitySpin
            width='200'
            color="#ED3E8D"
          />
          <h2 style={{ color: "#ED3E8D" }}>Loading...</h2>
        </div>
      }>
        <App />
      </Suspense>
    </HashRouter>
    {/* </BrowserRouter> */}
  </Provider >
)
