import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient.js"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TotalStats from './components/TotalStats.jsx'
import StatChange from './components/StatChange.jsx'
import StatsHistory from "./components/StatsHistory.jsx"



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


  async function updateStat(statId, newCalories, newProtein, newDate) {
    const { data, error } = await supabase
      .from('stats')
      .update({ calories: newCalories, protein: newProtein, created_at: newDate })
      .eq('id', statId)
      .select()

    if (error) {
      console.error('Update failed:', error)
    } else {
      setStats(prev =>
        prev.map(stat => (stat.id === statId ? { ...stat, ...data[0] } : stat))
      )
    }
  }

  async function deleteStat(id){
    const { data, error } = await supabase
      .from("stats")
      .delete()
      .eq('id', id)
      .select()
      if (error) console.error(error)
      else {
      console.log('Deleted:', data)
      setStats(stats.filter(stat => stat.id !== id))
    }
  }

  return (
    <>
      <Header/>
      <TotalStats stats={stats}/>
      <StatsHistory stats={stats} updateStat={updateStat} deleteStat={deleteStat}/>
      <StatChange addStat={addStat} />
      <Footer/>
    </>
  )
}

export default App
