import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from "../../utils/supabaseClient.js"

function Header({session}) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Error logging out:", error.message)
  }

  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem) {
      elem.blur()
    }
  }
  
  return (
    <>
      <div className="sticky top-0 z-50 w-full px-2 pt-4">
        <div className="navbar glass min-h-16 rounded-2xl border border-white/10 shadow-lg px-4 backdrop-blur-xl bg-base-100/60">
          <div className="navbar-start">
            {/*here is the dropdown for the header, the conditional checks to see if a user is logged in for it to work, otherwise it is gone */}
            {!session ? (
              <div></div>
                ) : (
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-base-content/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content glass mt-3 w-52 p-2 shadow-2xl rounded-box border border-white/10 bg-base-100/80 backdrop-blur-2xl">
                    <li><Link to={`/`} className="hover:bg-primary/20" onClick={closeDropdown}>Home</Link></li>
                    <li><Link to={`/addstats`} className="hover:bg-primary/20" onClick={closeDropdown}>Add Stats</Link></li>
                    <li><Link to={`/stats`} className="hover:bg-primary/20" onClick={closeDropdown}>History</Link></li>

                    {/* Divider and Logout */}
                    <div className="divider my-1 opacity-20"></div>
                    <li className="menu-title opacity-90 text-[10px] uppercase tracking-widest text-accent">Account</li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="text-error hover:bg-error/20 active:bg-error/30 transition-colors flex justify-between"
                      >
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
          </div>

          {/* Center: Brand */}
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl font-black tracking-tighter uppercase italic text-primary drop-shadow-sm">
              Buttz <span className="text-base-content">&</span> Gutz
            </a>
          </div>

          <div className="navbar-end gap-2">
            {/* Theme Controller */}
            <div className="flex items-center gap-3 bg-base-content/5 px-3 py-1.5 rounded-full border border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <input
              type="checkbox"
              value="light"
              className="toggle theme-controller"
            />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header