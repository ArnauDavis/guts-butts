import React from 'react'

function Footer() {
  return (
    <>
   
    <footer className="footer sm:footer-horizontal glass border-t border-white/10 text-base-content p-10 mt-10 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
      <aside>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold tracking-tight opacity-90">Buttz and Gutz</p>
          
          <p className="max-w-md leading-relaxed">
            Because
            <span className="text-rotate">
                <span className='mx-1'>
                  <span className="bg-teal-400 text-teal-800 px-2">growth</span>
                  <span className="bg-blue-400 text-blue-800 px-2">change</span>
                  <span className="bg-green-400 text-green-800 px-2">health</span>
                  <span className="bg-red-400 text-red-800 px-2">action</span>
                </span>
              </span>
            requires gutz, no buttz about it.
          </p>
        </div>
      </aside>
      
      <div className="opacity-60 text-sm self-end">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
    </footer>
    </>
  )
}

export default Footer