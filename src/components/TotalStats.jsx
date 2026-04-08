import React, { useState, useRef } from 'react'

function TotalStats({stats, goals, updateGoals}) {
  const [view, setView] = useState('daily') // Toggle between 'daily' and 'weekly'
  const checkboxRef = useRef(null) // To toggle dropdown form

  // Basic totals (All time)
  let totalCals = stats.reduce((sum, stat)=> sum + stat.calories, 0)
  const totalProtein = stats.reduce((sum, stat)=> sum + stat.protein, 0)

  // Date Logic
  const today = new Date().toLocaleDateString()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  // Calculate Daily Totals
  const dailyTotals = stats
    .filter(stat => new Date(stat.created_at).toLocaleDateString() === today)
    .reduce((acc, stat) => {
      return {
        calories: acc.calories + Number(stat.calories || 0),
        protein: acc.protein + Number(stat.protein || 0)
      }
    }, { calories: 0, protein: 0 })

  // Calculate Weekly Totals (Last 7 days)
  const weeklyTotals = stats
    .filter(stat => new Date(stat.created_at) >= oneWeekAgo)
    .reduce((acc, stat) => {
      return {
        calories: acc.calories + Number(stat.calories || 0),
        protein: acc.protein + Number(stat.protein || 0)
      }
    }, { calories: 0, protein: 0 })

  // Determine which goal set to use based on the toggle
  const activeGoals = view === 'daily' 
    ? {
        calories: goals?.daily_goal_calories || 2000,
        protein: goals?.daily_goal_protein || 150 
      }
    : {
        calories: goals?.weekly_goal_calories || 14000,
        protein: goals?.weekly_goal_protein || 1050
      }

  const currentProgress = view === 'daily' ? dailyTotals : weeklyTotals

  return (
    <>
    {/* Toggle Switch */}
    <div className="flex justify-center gap-2 mt-4">
      <button 
        onClick={() => setView('daily')}
        className={`btn btn-sm rounded-full ${view === 'daily' ? 'btn-primary' : 'btn-ghost'}`}
      >
        Daily View
      </button>
      <button 
        onClick={() => setView('weekly')}
        className={`btn btn-sm rounded-full ${view === 'weekly' ? 'btn-primary' : 'btn-ghost'}`}
      >
        Weekly View
      </button>
    </div>

    
     {/* Ring section */}
    <div className="flex justify-around items-center p-8 bg-base-100/50 backdrop-blur-2xl rounded-[3rem] border border-white/5 shadow-2xl mx-4 mt-6">

      {/* Calories Ring */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64" cy="64" r="58"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              className="text-secondary/10"
            />
            <circle
              cx="64" cy="64" r="58"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 * (1 - Math.min(currentProgress.calories / (activeGoals.calories || 1), 1))}
              strokeLinecap="round"
              className="text-secondary transition-all duration-1000 ease-out shadow-lg"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Kcal</span>
            <span className="text-2xl font-black text-secondary tracking-tighter">
              {activeGoals.calories > 0 ? Math.round((currentProgress.calories / activeGoals.calories) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{view} Energy</p>
          <p className="text-[10px] font-mono opacity-40">{currentProgress.calories} / {activeGoals.calories}</p>
        </div>
      </div>

      {/* Protein Ring */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64" cy="64" r="58"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              className="text-primary/10"
            />
            <circle
              cx="64" cy="64" r="58"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 * (1 - Math.min(currentProgress.protein / (activeGoals.protein || 1), 1))}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Grams</span>
            <span className="text-2xl font-black text-primary tracking-tighter">
              {activeGoals.protein > 0 ? Math.round((currentProgress.protein / activeGoals.protein) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{view} Protein</p>
          <p className="text-[10px] font-mono opacity-40">{currentProgress.protein} / {activeGoals.protein}</p>
        </div>
      </div>

    </div>

     {/* Total stats */}
    <div className="flex justify-center w-full my-6">
      <div className="stats stats-vertical lg:stats-horizontal glass border border-white/10 shadow-2xl rounded-box overflow-hidden">
        
        {/* Protein Stat */}
        <div className="stat place-items-center border-white/5">
          <div className="stat-title text-base-content/60 font-medium">Total Protein</div>
          <div className="stat-value text-primary drop-shadow-sm">
            {totalProtein} <span className="text-sm font-normal opacity-70">grams</span>
          </div>
          <div className="stat-desc opacity-50">Lifetime Accumulation</div>
        </div>
      
        {/* Calories Stat */}
        <div className="stat place-items-center border-white/5 bg-white/5">
          <div className="stat-title text-base-content/60 font-medium">Total Calories</div>
          <div className="stat-value text-secondary drop-shadow-sm">{totalCals}</div>
          <div className="stat-desc text-secondary opacity-80 font-medium">All-time Burned/Consumed</div>
        </div>
      
        {/* Workouts Stat */}
        <div className="stat place-items-center border-white/5">
          <div className="stat-title text-base-content/60 font-medium">Records</div>
          <div className="stat-value text-accent drop-shadow-sm">{stats.length}</div>
          <div className="stat-desc opacity-50 font-medium">Logged Entries</div>
        </div>
        
      </div>
    </div>

    </>
  )
}

export default TotalStats