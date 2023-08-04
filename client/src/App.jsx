import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Navbar from './components/navBar/Navbar'
import Cart from './components/Cart'
import Home from './components/Home'
import './App.css'
import Pagenf from './components/pnf/Pagenf'
import DetailsPage from './components/DetailsPage'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
  <Navbar/>
  <Routes>
    <Route  path='/' element = {<Home/>} />
    <Route  path='/cart' element = {<Cart/>} />
    <Route  path='/product/:id' element = {<DetailsPage/>} />
   
    <Route  path='*' element = {<Pagenf/>} />
  </Routes>
    </BrowserRouter>
  
  )
}

export default App