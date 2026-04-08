import React from 'react'
import { useRef } from 'react'

function UpdateGoals({goals, updateGoals}) {
    const checkboxRef = useRef(null) // To toggle dropdown form
    return (
        <>
        {/* Form to manage all goals */}
          <div className="mx-4 mt-12 mb-10">
            <div className="collapse collapse-arrow bg-base-200/40 border border-white/5 backdrop-blur-md rounded-3xl shadow-xl">
              <input 
                id="target-settings-check"
                type="checkbox" 
                ref={checkboxRef} 
                className="peer" 
              /> 
              <label 
                htmlFor="target-settings-check"
                className="collapse-title p-6 bg-white/5 pr-12 text-base-content cursor-pointer block"
              >
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full"></span>
                  Target Settings
                </h3>
                <p className="text-xs opacity-50 uppercase tracking-widest">Adjust your daily and weekly requirements</p>
              </label>

              <div className="collapse-content text-base-content">
                <form 
                  className="pt-6 space-y-6 border-t border-white/5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    updateGoals({
                      daily_goal_calories: Number(formData.get('daily_cals')),
                      daily_goal_protein: Number(formData.get('daily_protein')),
                      weekly_goal_calories: Number(formData.get('weekly_cals')),
                      weekly_goal_protein: Number(formData.get('weekly_protein'))
                    })
                    if (checkboxRef.current) checkboxRef.current.checked = false
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Daily Column */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Daily Targets</h4>
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase opacity-40 font-black">Calories</label>
                        <input name="daily_cals" type="number" defaultValue={goals?.daily_goal_calories} className="input input-ghost bg-white/5 border-white/10 w-32 text-right focus:bg-white/10" />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase opacity-40 font-black">Protein (g)</label>
                        <input name="daily_protein" type="number" defaultValue={goals?.daily_goal_protein} className="input input-ghost bg-white/5 border-white/10 w-32 text-right focus:bg-white/10" />
                      </div>
                    </div>
              
                    {/* Weekly Column */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-2">Weekly Targets</h4>
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase opacity-40 font-black">Calories</label>
                        <input name="weekly_cals" type="number" defaultValue={goals?.weekly_goal_calories} className="input input-ghost bg-white/5 border-white/10 w-32 text-right focus:bg-white/10" />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] uppercase opacity-40 font-black">Protein (g)</label>
                        <input name="weekly_protein" type="number" defaultValue={goals?.weekly_goal_protein} className="input input-ghost bg-white/5 border-white/10 w-32 text-right focus:bg-white/10" />
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
          </div>
        </>
    )
}

export default UpdateGoals