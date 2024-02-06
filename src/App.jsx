import { Route, Routes } from 'react-router-dom'
import './assets/styles/App.css'
import Login from './components/publics/Login'
import Register from './components/publics/Register'
import Home from './components/private/Home'
import RequireAuth from './components/private/utils/RequireAuth'
import Workspace from './components/private/workspace/Workspace'
import PersistLogin from './components/private/utils/PersistLogin'
import Board from './components/private/board/Board'
import UserSettings from './components/private/user/UserSettings'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<Login />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Register />} />

      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route path='/' element={<RequireAuth />}>
          <Route path='home' element={<Home />} />
        </Route>

        <Route path='/' element={<RequireAuth />}>
          {/* Contains routes inside the component */}
          <Route path='workspace/:id/*' element={<Workspace />} />
        </Route>

        <Route path='/' element={<RequireAuth />}>
          <Route path='board/:id/*' element={<Board />} />
        </Route>

        <Route path='/' element={<RequireAuth />}>
          <Route path='user/:username' element={<UserSettings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
