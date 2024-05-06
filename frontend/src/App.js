import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/header'



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Header />}>
            <Route path='home' element={<Home />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App;
