import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Signup from './pages/Signup';
import Login from './pages/Login';
import Navebar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AddVehicle from './pages/AddVehicle'
import ViewVehicles from './pages/ViewVehicles';

const App = () => {
  return (
    <Router>
      <Navebar/>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/add-vehicle" element={<AddVehicle/>}/>
      <Route path="/view-vehicles" element={<ViewVehicles/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App