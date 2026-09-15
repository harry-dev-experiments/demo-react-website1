import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import LeaderProfile from './Pages/LeaderProfile/LeaderProfile'
import AdminEvents from './Pages/AdminEvents/AdminEvents'
import { PageTransition } from './Components/PageTransition/PageTransition'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/leader/:roleId" element={<PageTransition><LeaderProfile /></PageTransition>} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App