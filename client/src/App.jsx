import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  )
}

export default App;
