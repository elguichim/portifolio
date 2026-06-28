
import './pages/index.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/project/Dashboard/Dashboard'
import Eletric from './pages/project/Eletric/Eletric'
import Tasks from './pages/project/Tasks/Tasks'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eletric" element={<Eletric />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
