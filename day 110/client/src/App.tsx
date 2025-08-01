
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.tsx';
import Navbar from './components/Navbar.tsx';
import CreateBlog from './pages/CreateBlog.tsx';
import Footer from './components/Footer.tsx';
import SingleBlogDetails from './pages/singleBlogDetalis.tsx'; // Corrected component name and file name
import LoginPage from './pages/Loginpage.tsx'; 
import Signuppage from './pages/signup.tsx';
import Blogpage from './pages/Blogpage.tsx';
import Profile from './pages/Profile.tsx';
import EditBlog from './pages/EditBlog.tsx';

import BlogSummaryPage from './pages/BlogSummaryPage.tsx';


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
        <Route path="/blog-summary/:id" element={<BlogSummaryPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
