import React from 'react'

function Footer() {
  return (
    <>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-4">
      <aside>
        <p>
          Buttz and Gutz
          <br />
          <span>
          Because
          <span className="text-rotate">
            <span className='mx-1'>
              <span className="bg-teal-400 text-teal-800 px-2">growth</span>
              <span className="bg-blue-400 text-blue-800 px-2">change</span>
              <span className="bg-green-400 text-green-800 px-2">health</span>
              <span className="bg-red-400 text-red-800 px-2">action</span>
            </span>
          </span>
        </span>
        requires gutz, no buttz about it.
        </p>
      </aside>
       <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
    </>
  )
}

export default Footer