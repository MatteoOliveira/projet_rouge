import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Favoris from './pages/favoris'
import Vus from './pages/vus'
import Avoir from './pages/avoir'
import Search from './pages/search'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Login from './components/Login'
import Register from './components/Register'



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />}>
            <Route path='home' element={<Home />} />
            <Route path='favoris' element={<Favoris />} />
            <Route path='vus' element={<Vus />} />
            <Route path='avoir' element={<Avoir />} />
            <Route path='search' element={<Search />} />
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            
        </Route>
      </Routes>
    </div>
  )
}

export default App;
