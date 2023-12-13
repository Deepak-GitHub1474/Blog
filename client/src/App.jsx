import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AddBlog from './pages/AddBlog/AddBlog';
import MyBlog from './pages/MyBlog/MyBlog';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';
import ReadBlog from './pages/ReadBlog/ReadBlog';
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} />
        <Route path="/readblog/:blogID" element={<ReadBlog />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
