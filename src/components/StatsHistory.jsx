import React from 'react'
import { useEffect, useState } from "react"

function StatsHistory({stats, deleteStat, updateStat}) {
    const [editingStat, setEditingStat] = useState(null)
    const [tempCalories, setTempCalories] = useState("")
    const [tempProtein, setTempProtein] = useState("")
    const [tempDate, setTempDate] = useState("")

    // Helper to convert DB timestamp to 'YYYY-MM-DDTHH:mm' for the input
  const formatForInput = (timestamp) => {
    if (!timestamp) return ""
    const d = new Date(timestamp)
    // Adjust for timezone offset to get local time string
    const offset = d.getTimezoneOffset() * 60000
    const localISOTime = new Date(d.getTime() - offset).toISOString().slice(0, 16)
    return localISOTime
  }


    const handleEditClick = (stat) => {
    setEditingStat(stat)
    setTempCalories(stat.calories)
    setTempProtein(stat.protein)
    setTempDate(formatForInput(stat.created_at))
    // Open the modal using DaisyUI/HTML5 dialog API
    document.getElementById('edit_modal').showModal()
  }

    const handleSave = async () => {
        await updateStat(editingStat.id, tempCalories, tempProtein, new Date(tempDate).toISOString())
        setEditingStat(null)
        document.getElementById('edit_modal').close()
      }
    

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
    <div className="overflow-x-auto glass rounded-box border border-white/10 shadow-xl mx-2">
      <table className="table w-full">
        {/* Head */}
        <thead className="bg-base-content/10 text-base-content">
          <tr className="border-b border-white/10">
            <th className="font-bold uppercase tracking-wider text-[10px] sm:text-xs opacity-70">Date & Time</th>
            <th className="font-bold uppercase tracking-wider text-[10px] sm:text-xs opacity-70 text-center">Calories</th>
            <th className="font-bold uppercase tracking-wider text-[10px] sm:text-xs opacity-70 text-center">Protein</th>
            <th className="w-16"></th>
          </tr>
        </thead>

        <tbody className="text-base-content/90">
          {sortedStats.map((stat) => (
            <tr key={stat.id} className="border-b border-white/5 hover:bg-base-100/20 transition-colors group">

              {/* Date and time */}
              <td className="whitespace-nowrap py-3">
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-tight">
                    {new Date(stat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs opacity-50 uppercase">
                    {new Date(stat.created_at).toLocaleDateString()}
                  </span>
                </div>
              </td>
          
              {/* Calories with kcal */}
              <td className="text-center py-3">
                <span className="font-bold text-secondary drop-shadow-[0_0_8px_rgba(var(--s),0.2)] text-sm sm:text-base">
                  {stat.calories}
                  <span className="text-[10px] ml-0.5 opacity-60 font-normal">kcal</span>
                </span>
              </td>
          
              {/* Protein with g */}
              <td className="text-center py-3">
                <span className="font-bold text-primary drop-shadow-[0_0_8px_rgba(var(--p),0.2)] text-sm sm:text-base">
                  {stat.protein}
                  <span className="text-[10px] ml-0.5 opacity-60 font-normal">g</span>
                </span>
              </td>
          
              {/* Actions */}
              <td className="py-3 text-right">
                <div className="inline-flex items-center gap-1 sm:gap-2 align-middle">
                  {/* Edit Button */}
                  <button 
                    className="btn btn-ghost btn-xs sm:btn-sm h-8 w-8 min-h-0 p-0 bg-info/10 hover:bg-info/30 text-info border border-info/20 backdrop-blur-md"
                    onClick={() => handleEditClick(stat)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
          
                  {/* Delete Button */}
                  <button 
                    className="btn btn-ghost btn-xs sm:btn-sm h-8 w-8 min-h-0 p-0 bg-error/10 hover:bg-error/30 text-error border border-error/20 backdrop-blur-md"
                    onClick={() => deleteStat(stat.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* --- DaisyUI Glassmorphism Modal --- */}
    <dialog id="edit_modal" className="modal backdrop-blur-sm">
      <div className="modal-box bg-white/20 border border-white/20 backdrop-blur-md shadow-2xl">
        <h3 className="font-bold text-lg mb-4 text-white">Update Entry</h3>
        
        <div className="space-y-4">
          {/* Date/Time Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-white/80">Date & Time</span>
            </label>
            <input 
              type="datetime-local" 
              className="input bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 transition-all" 
              value={tempDate} 
              onChange={(e) => setTempDate(e.target.value)} 
            />
          </div>
        
          <div className="grid grid-cols-2 gap-4">
            {/* Calories Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white/80">Calories</span>
              </label>
              <input 
                type="number" 
                className="input bg-white/10 border-white/20 text-white focus:bg-white/20 transition-all" 
                value={tempCalories} 
                onChange={(e) => setTempCalories(e.target.value)} 
              />
            </div>
        
            {/* Protein Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white/80">Protein (g)</span>
              </label>
              <input 
                type="number" 
                className="input bg-white/10 border-white/20 text-white focus:bg-white/20 transition-all" 
                value={tempProtein} 
                onChange={(e) => setTempProtein(e.target.value)} 
              />
            </div>
          </div>
        </div>
        
        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-white/10 border-none hover:bg-white/30 text-white">Cancel</button>
          </form>
          <button 
            className="btn bg-primary/80 border-none hover:bg-primary text-white" 
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
    
    </>
  )
}

export default StatsHistory