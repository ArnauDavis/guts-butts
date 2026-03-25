import React from 'react'
import { useEffect, useState } from "react"

function TotalStats({stats}) {
  let totalCals = stats.reduce((sum, stat)=> sum+stat.calories,0)
  const totalProtein = stats.reduce((sum,stat)=> sum+stat.protein,0)
  return (
    <>
    <div className="flex justify-center w-full my-6">
      <div className="stats stats-vertical lg:stats-horizontal glass border border-white/10 shadow-2xl rounded-box overflow-hidden">
        
        {/* Protein Stat */}
        <div className="stat place-items-center border-white/5">
          <div className="stat-title text-base-content/60 font-medium">Protein</div>
          <div className="stat-value text-primary drop-shadow-sm">
            {totalProtein} <span className="text-sm font-normal opacity-70">grams</span>
          </div>
          <div className="stat-desc opacity-50">Jan 1st — Feb 1st</div>
        </div>
      
        {/* Calories Stat */}
        <div className="stat place-items-center border-white/5 bg-white/5">
          <div className="stat-title text-base-content/60 font-medium">Calories</div>
          <div className="stat-value text-secondary drop-shadow-sm">{totalCals}</div>
          <div className="stat-desc text-secondary opacity-80 font-medium">↗︎ 40 (2%)</div>
        </div>
      
        {/* Workouts Stat */}
        <div className="stat place-items-center border-white/5">
          <div className="stat-title text-base-content/60 font-medium">Total Workouts</div>
          <div className="stat-value text-accent drop-shadow-sm">3</div>
          <div className="stat-desc opacity-50 font-medium text-error">↘︎ 1 (25%)</div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default TotalStats