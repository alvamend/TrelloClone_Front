import { Route, Routes } from 'react-router-dom'
import './assets/styles/App.css'
import Login from './components/publics/Login'
import Register from './components/publics/Register'
import Home from './components/private/Home'
import RequireAuth from './components/private/RequireAuth'
import Workspace from './components/private/Workspace'

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

      <Route path='/' element={<RequireAuth />}>
        <Route path='/workspace/:id' element={<Workspace />} />
      </Route>
    </Routes>
  )
}

export default App
