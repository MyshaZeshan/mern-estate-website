import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-blue-200 shadow-mist-400 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link to="/">
                <div className=" text-sm ">
                    <span className=" font-bold sm:text-2xl text-yellow-600">MZ</span>
                    <span>Estate</span>
                </div>
            </Link>
            <form className="border border-slate-600 p-2 rounded-lg flex items-center">
                <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                <FaSearch className = "text-slate-600"/>
            </form>
            <ul className = "flex gap-4">
                <Link to="/">
                    <li className='hidden sm:inline text-blue-900  hover:underline hover:decoration-yellow-600 hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>Home</li>
                </Link>
                <Link to="/About">
                    <li className='hidden sm:inline text-blue-900  hover:underline hover:decoration-yellow-600 hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>About</li>
                </Link>
                <Link to="/SignIn">
                    <li className='text-blue-900  hover:underline hover:decoration-yellow-600 hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>SignIn</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}

export default Header