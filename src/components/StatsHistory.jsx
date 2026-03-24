import React from 'react'

function StatsHistory({stats}) {
    const formatDateTime = (timestamp) => {
    if (!timestamp) return ""
    
    const d = new Date(timestamp)
    
    // Format the time: "8:07pm"
    const time = d.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    }).toLowerCase().replace(' ', '')
    
    // Format the date: "3/21/26"
    const date = d.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: '2-digit' 
    })

    return `${time} ${date}`
  }

    const sortedStats = stats.toSorted((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    )
  return (
    <>
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Date</th>
            <th>Calories</th>
            <th>Protein</th>
          </tr>
        </thead>
        <tbody>
            {sortedStats.map((stat) => (
            <tr>
            <td key={stat.id}>{formatDateTime(stat.created_at)}</td>
            <td key={stat.id}>{stat.calories}</td>
            <td key={stat.id}>{stat.protein}</td>
            </tr>
          ))}
    
        </tbody>
      </table>
    </div>
    </>
  )
}

export default StatsHistory