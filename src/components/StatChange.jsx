import React from 'react'
import { useState } from "react"

function StatChange({addStat}) {
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")


   async function handleSubmit(e) {
    e.preventDefault()

    const newStat = {
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
    }
    await addStat(newStat)
    setCalories("")
    setProtein("")
   }


  return (
    <>


    <div className="flex items-center w-full flex-col my-6">
      <form 
        onSubmit={handleSubmit} 
        className="glass p-8 rounded-box flex flex-col items-center space-y-6 border border-white/10 shadow-2xl"
      >
        <h2 className="text-xl font-bold opacity-80">Track Progress</h2>

        <div className="flex flex-col gap-4">
          {/* Calories Input */}
          <fieldset className="fieldset p-0 bg-transparent">
            <legend className="fieldset-legend text-xs uppercase tracking-widest opacity-60">Calories</legend>
            <input
              className="input input-bordered bg-base-100/30 backdrop-blur-sm border-white/10 focus:outline-accent"
              type="number"
              placeholder="0 kcal"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </fieldset>

          {/* Protein Input */}
          <fieldset className="fieldset p-0 bg-transparent">
            <legend className="fieldset-legend text-xs uppercase tracking-widest opacity-60">Protein</legend>
            <input
              className="input input-bordered bg-base-100/30 backdrop-blur-sm border-white/10 focus:outline-accent"
              type="number"
              placeholder="0 g"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </fieldset>
        </div>

        <button className="btn btn-accent btn-wide shadow-lg" type="submit">
          Add Stats
        </button>
      </form>
    </div>

    </>
  )
}

export default StatChange