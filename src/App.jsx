import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/Pages/Home'
import Alianzas from '@/Pages/Alianzas'
import Galeria from '@/Pages/Galeria'
import Campamentos from '@/Pages/Campamentos'
import Juego from '@/Pages/Juego'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/alianzas" element={<Alianzas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/campamentos" element={<Campamentos />} />
        <Route path="/juego" element={<Juego />} />
      </Route>
    </Routes>
  )
}

export default App
