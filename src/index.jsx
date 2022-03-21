import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import '@material-tailwind/react/tailwind.css'
import { initCometChat } from './cometChat'
import { loadWeb3 } from './shared/Freshers'
import App from './App'

loadWeb3().then(() => {
  initCometChat().then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    )
  })
})
