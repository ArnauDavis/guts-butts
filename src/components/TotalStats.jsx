import React, { useState } from 'react'

function TotalStats({stats, goals, updateGoals}) {
  const [view, setView] = useState('daily') // Toggle between 'daily' and 'weekly'

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

    {/* Form to manage all goals */}
    <div className="mx-4 mt-12 mb-10">
      <div className="bg-base-200/40 border border-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span>
            Target Settings
          </h3>
          <p className="text-xs opacity-50">Adjust your daily and weekly requirements</p>
        </div>
        
        <form 
          className="p-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            updateGoals({
              daily_goal_calories: Number(formData.get('daily_cals')),
              daily_goal_protein: Number(formData.get('daily_protein')),
              weekly_goal_calories: Number(formData.get('weekly_cals')),
              weekly_goal_protein: Number(formData.get('weekly_protein'))
            })
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary">Daily Targets</h4>
              <div className="form-control">
                <label className="label text-[10px] uppercase opacity-40 font-bold mr-2">Calories</label>
                <input name="daily_cals" type="number" defaultValue={goals?.daily_goal_calories} className="input input-ghost bg-white/5 focus:bg-white/10 border-white/10" placeholder="2000" />
              </div>
              <div className="form-control">
                <label className="label text-[10px] uppercase opacity-40 font-bold mr-2">Protein (g)</label>
                <input name="daily_protein" type="number" defaultValue={goals?.daily_goal_protein} className="input input-ghost bg-white/5 focus:bg-white/10 border-white/10" placeholder="150" />
              </div>
            </div>

            {/* Weekly Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary">Weekly Targets</h4>
              <div className="form-control">
                <label className="label text-[10px] uppercase opacity-40 font-bold mr-2">Calories</label>
                <input name="weekly_cals" type="number" defaultValue={goals?.weekly_goal_calories} className="input input-ghost bg-white/5 focus:bg-white/10 border-white/10" placeholder="14000" />
              </div>
              <div className="form-control">
                <label className="label text-[10px] uppercase opacity-40 font-bold mr-2">Protein (g)</label>
                <input name="weekly_protein" type="number" defaultValue={goals?.weekly_goal_protein} className="input input-ghost bg-white/5 focus:bg-white/10 border-white/10" placeholder="1050" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn btn-primary btn-block rounded-2xl shadow-lg shadow-primary/20">
              Save Targets
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default TotalStats