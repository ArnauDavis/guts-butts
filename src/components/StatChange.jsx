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
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend whitespace-nowrap">Add calories</legend>
          <div className="join">
            <input
              className="input join-item"
              type="number"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
      </fieldset>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend whitespace-nowrap">Add protein</legend>
          <div className="join">
            <input
              className="input join-item"
              type="number"
              placeholder="Protein (g)"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </div>
      </fieldset>

      <button className="btn btn-accent" type="submit">Add Stats</button>
    </form>
    </div>


    <div className="flex items-center w-full flex-col my-6">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend whitespace-nowrap">Add protein</legend>
      <div className="join">
        <input type="number" className="input join-item" placeholder="Protein" />
        <button className="btn join-item">Submit</button>
      </div>
    </fieldset>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend whitespace-nowrap">Add calories</legend>
      <div className="join">
        <input type="number" className="input join-item" placeholder="Calories" />
        <button className="btn join-item">Submit</button>
      </div>
    </fieldset>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend whitespace-nowrap">Add workout</legend>
      <div className="join">
        <input type="number" className="input join-item" placeholder="Workout" />
        <button className="btn join-item">Submit</button>
      </div>
    </fieldset>
    </div>
    </>
  )
}

export default StatChange