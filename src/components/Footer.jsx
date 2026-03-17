import React from 'react'

function Footer() {
  return (
    <>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-4">
      <aside>
        <p>
          Butts and Guts
          <br />
          Big results, no butt about it.
        </p>
      </aside>
       <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
    </>
  )
}

export default Footer