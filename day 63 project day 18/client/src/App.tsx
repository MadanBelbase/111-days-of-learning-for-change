
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import Footer from './components/Footer';
import SingleBlogDetails from './pages/singleBlogDetalis'; // Corrected component name and file name

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<SingleBlogDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
