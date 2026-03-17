import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TotalStats from './components/TotalStats.jsx'
import StatChange from './components/StatChange.jsx'

function App() {
  

  return (
    <>
      <Header/>
      <TotalStats/>
      <StatChange/>
      <Footer/>
    </>
  )
}

export default App
