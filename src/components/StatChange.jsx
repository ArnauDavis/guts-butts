import React from 'react'

function StatChange() {
  return (
    <>
    <div className="flex items-center w-full flex-col mx-2">
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