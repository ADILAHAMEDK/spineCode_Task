import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-black'>
        <div className='w-4/5 mx-auto  py-3 text-white flex items-center justify-between'>
        <Link to="/"><h1 className='text-white sm:text-xl  lg:text-2xl font-semibold'>Task Management</h1></Link>
        <div className='flex items-center gap-2 lg:gap-5 text-base lg:text-lg'>
            <Link to="/">Home</Link>
            <Link>about</Link>
            <Link to="/api">Api</Link>
        </div>
        </div>
    </div>
  )
}

export default Header