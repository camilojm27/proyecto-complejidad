import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/normalize.css'
import './input.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Form } from './pages/Form'
import Stepper from './components/Stepper'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />
  },
  {
    path: '/teams/:numTeams/:minSize/:maxSize',
    element: <Stepper />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
