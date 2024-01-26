import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// delete import on implementation
import Messenger from './components/Messenger.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* move messenger component on implementation */}
    <Messenger/>
    <App />
  </React.StrictMode>,
)
