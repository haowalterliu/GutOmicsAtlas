import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ScRNA from './pages/ScRNA'
import Spatial from './pages/Spatial'
import Help from './pages/Help'
import About from './pages/About'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrna" element={<ScRNA />} />
          <Route path="/snatac" element={<Navigate to="/scrna" replace />} />
          <Route path="/spatial" element={<Spatial />} />
          <Route path="/spatial-metabolomics" element={<Navigate to="/spatial" replace />} />
          <Route path="/spatial-transcriptomics" element={<Navigate to="/spatial" replace />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
