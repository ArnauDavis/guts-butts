import React from 'react'
import { useEffect, useState } from "react"

function TotalStats({stats}) {
  let totalCals = stats.reduce((sum, stat)=> sum+stat.calories,0)
  const totalProtein = stats.reduce((sum,stat)=> sum+stat.protein,0)
  return (
    <>
    <div className="flex justify-center w-full my-6">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Protein</div>
            <div className="stat-value">{totalProtein} grams</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Calories</div>
            <div className="stat-value text-secondary">{totalCals}</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%) from last month</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Workouts</div>
            <div className="stat-value">3</div>
            <div className="stat-desc">↘︎ 1 (25%)</div>
          </div>
        </div>
    </div>
    </>
  )
}

export default TotalStats