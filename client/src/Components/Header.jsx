import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <header className="bg-orange-500 shadow-mist-400 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link to="/">
                <div className=" text-sm ">
                    <span className=" font-bold sm:text-2xl text-[rgb(245,231,198)]">MZ</span>
                    <span className="text-[rgb(34,34,34)]">Estate</span>
                </div>
            </Link>
            <form className="border border-slate-600 p-2 rounded-lg flex items-center bg-[rgb(250,243,225)]">
                <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                <FaSearch className = "text-slate-600"/>
            </form>
            <ul className = "flex gap-4">
                <Link to="/">
                    <li className='hidden sm:inline text-[rgb(245,231,198)] hover:underline hover:decoration-black hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>Home</li>
                </Link>
                <Link to="/About">
                    <li className='hidden sm:inline text-[rgb(245,231,198)]  hover:underline hover:decoration-black hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>About</li>
                </Link>
                <Link to='/Profile'>
                    {currentUser ? (
                        <img src={currentUser.photo } alt='profile-pic' className="w-7 h-7 rounded-full object-cover"/>) : (
                        <li className='text-[rgb(245,231,198)] hover:underline hover:decoration-black hover:decoration-2 hover:underline-offset-4 transition-all duration-300'>SignIn</li>
                    )}
                </Link>

            </ul>
        </div>
    </header>
  )
}

export default Header