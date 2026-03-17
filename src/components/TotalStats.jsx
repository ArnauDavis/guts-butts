import React from 'react'

function TotalStats() {
  return (
    <>
    <div className="flex justify-center w-full">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Protein</div>
            <div className="stat-value">31 grams</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Calories</div>
            <div className="stat-value text-secondary">4,200</div>
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