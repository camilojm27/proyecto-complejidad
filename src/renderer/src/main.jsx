import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/normalize.css'
import './input.css'
import App from './App'
import { Form } from './pages/Form'
import Versions from './components/Versions'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
)
