import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/Pages/Home'
import Alianzas from '@/Pages/Alianzas'
import Galeria from '@/Pages/Galeria'
import Placeholder from '@/Pages/Placeholder'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/alianzas" element={<Alianzas />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route
          path="/campamentos"
          element={<Placeholder title="Campamentos" />}
        />
      </Route>
    </Routes>
  )
}

export default App
