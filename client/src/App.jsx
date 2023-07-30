import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/navBar/Navbar'
import Cart from './components/Cart'
import Home from './components/Home'
import './App.css'
import Pagenf from './components/pnf/Pagenf'

function App() {
  return (
    <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route  path='/' element = {<Home/>} />
    <Route  path='/cart' element = {<Cart/>} />
    <Route  path='*' element = {<Pagenf/>} />
  </Routes>
    </BrowserRouter>
  
  )
}

export default App