import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TotalStats from './components/TotalStats.jsx'
import StatChange from './components/StatChange.jsx'

function App() {
    const [stats, setStats] = useState([])
  useEffect(() => {
    getStats()
  }, [])


  async function getStats() {
    const { data, error } = await supabase.from("stats").select()
    if (error) {
      console.error(error)
    } else {
      setStats(data)
    }
  }

  async function addStat(newStat) {
    const { data, error } = await supabase
      .from("stats")
      .insert([newStat])
      .select()
    if (error) {
      console.error("Error adding stat:", error)
    } else {
      setStats((prev) => [...prev, ...data])
    }
  }

  return (
    <>
      <Header/>
      <TotalStats stats={stats}/>
      <StatChange addStat={addStat} />
      <Footer/>
    </>
  )
}

export default App
