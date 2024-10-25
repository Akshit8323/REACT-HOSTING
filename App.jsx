import { StrictMode, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Firebase/Login'
import SignUp from './Firebase/SignUp'
import Dashboard from './Firebase/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <StrictMode>
        <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Login/>}></Route>
          <Route path='/signup' element ={<SignUp/>}></Route>
          <Route path='/app' element ={<Dashboard/>}></Route>     
        </Routes>
        </BrowserRouter>
      </StrictMode>
    </>
  )
}

export default App
