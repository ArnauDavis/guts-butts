import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header.jsx'
import TotalStats from './components/TotalStats.jsx'
import StatChange from './components/StatChange.jsx'

function App() {
  

  return (
    <>
      <Header/>
      <TotalStats/>
      <StatChange/>

    </>
  )
}

export default App
