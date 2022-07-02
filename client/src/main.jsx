import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import Login from './pages/auth/LogIn'
// import Register from './pages/auth/Register'
// import Admin from './pages/dashboards/Admin'
// import NavigationBar from './components/NavigationBar'

import { BrowserRouter, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)
