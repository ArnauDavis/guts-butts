import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient.js"
import './App.css'
import Auth from "./components/Auth.jsx"
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TotalStats from './components/TotalStats.jsx'
import StatChange from './components/StatChange.jsx'
import StatsHistory from "./components/StatsHistory.jsx"

function App() {
  const [stats, setStats] = useState([])
  const [goals, setGoals] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      getStats()
      getGoals()
    } else {
      setStats([]) // Clear stats on logout
      setGoals(null)
    }
  }, [session])

  async function getStats() {
    // Filter by the logged-in user's ID
    const { data, error } = await supabase
      .from("stats")
      .select()
      .eq('user_id', session.user.id) 
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setStats(data)
  }
  

  async function getGoals() {
    const { data, error } = await supabase
      .from("goals")
      .select()
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (error) {
      console.error("Error fetching goals:", error)
    } else {
      setGoals(data)
    }
  }



  async function addStat(newStat) {
    // Automatically attach the user's ID to the new record
    const statWithUser = { ...newStat, user_id: session.user.id }
    
    const { data, error } = await supabase
      .from("stats")
      .insert([statWithUser])
      .select()

    if (error) console.error("Error adding stat:", error)
    else setStats((prev) => [...prev, ...data])
  }

  async function updateStat(statId, newCalories, newProtein, newDate) {
    const { data, error } = await supabase
      .from('stats')
      .update({ calories: newCalories, protein: newProtein, created_at: newDate })
      .eq('id', statId)
      .eq('user_id', session.user.id) // Security check
      .select()

    if (error) console.error('Update failed:', error)
    else setStats(prev =>
        prev.map(stat => (stat.id === statId ? { ...stat, ...data[0] } : stat))
      )
  }

  async function updateGoals(goalUpdate) {
    // goalUpdate should look like { daily_goal_calories: 2500 }
    const { data, error } = await supabase
      .from("goals")
      .upsert({ 
        user_id: session.user.id, 
        ...goalUpdate 
      }, { onConflict: 'user_id' }) // Tells Supabase to update if user_id exists
      .select()
    
    if (error) {
      console.error("Error updating goals:", error)
    } else {
      setGoals(data[0])
    }
  }

  async function deleteStat(id) {
    const { data, error } = await supabase
      .from("stats")
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id) // Security check
      .select()

    if (error) console.error(error)
    else setStats(stats.filter(stat => stat.id !== id))
  }

  if (loading) return <div className="min-h-screen bg-base-100" /> // Simple loader

  return (
    <>
    <div className="min-h-screen flex flex-col">
      {!session ? (
        <Auth />
      ) : (
        <>
          <Header session={session} />
          <main className="grow space-y-8 pb-20">
            <TotalStats stats={stats} goals={goals} updateGoals={updateGoals}/>
            <StatChange addStat={addStat} />
            <StatsHistory stats={stats} updateStat={updateStat} deleteStat={deleteStat} />
          </main>
          <Footer />
        </>
      )}
    </div>
    </>
    
    
  )
}

export default App
