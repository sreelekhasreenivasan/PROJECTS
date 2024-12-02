import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    
    <div className='w-full shadow-sm'>
        <header className='w-full bg-blue-400 shadow-sm  h-10 ' >
            <nav className='ml-96 p-2 '>
                <ul className='flex gap-8 justify-end '>
                    <li><Link to={'/home'}>Home</Link> </li>
                    <li><Link to={'/add-vehicle'}>Add Vehicle</Link> </li>
                    <li><Link to={'/view-vehicles'}>View Vehicles</Link> </li>
                    <li><Link to={'/login'}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar