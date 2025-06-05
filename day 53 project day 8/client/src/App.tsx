import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import CreateBlog from './pages/CreateBlog'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
