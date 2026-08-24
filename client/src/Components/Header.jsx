import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [search,setsearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search',search);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
 
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const urlsearch = urlParams.get('search');
    if(urlsearch){
        setsearch(urlsearch);
    }
  },[location.search])

  return (
    <header className="bg-orange-500 shadow-mist-400 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link to="/">
                <div className=" text-sm ">
                    <span className=" font-bold sm:text-2xl text-[rgb(245,231,198)]">MZ</span>
                    <span className="text-[rgb(34,34,34)]">Estate</span>
                </div>
            </Link>
            <form onSubmit={handleSubmit} className="border border-slate-600 p-2 rounded-lg flex items-center bg-[rgb(250,243,225)]">
                <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                <button type='submit'>
                    <FaSearch className = "text-slate-600"/>
                </button>

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