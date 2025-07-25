
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import Footer from './components/Footer';
import SingleBlogDetails from './pages/singleBlogDetalis'; // Corrected component name and file name
import LoginPage from './pages/Loginpage'; 
import Signuppage from './pages/signup';
import Blogpage from './pages/Blogpage';
import Profile from './pages/Profile';
import EditBlog from './pages/EditBlog'


function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<SingleBlogDetails />} />
        <Route path = "/blogs" element = {<Blogpage/> } />
        <Route path = "/profile/:userId" element = {<Profile/> } />
        <Route path = "/edit-blog/:id" element = { <EditBlog />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
