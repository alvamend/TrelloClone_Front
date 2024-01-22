import { Route, Routes } from 'react-router-dom'
import './assets/styles/App.css'
import Login from './components/publics/Login'
import Register from './components/publics/Register'
import Home from './components/private/Home'
import RequireAuth from './components/private/RequireAuth'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Login />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Register />} />

      {/* Private Routes */}
      <Route path='/' element={<RequireAuth />}>
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
