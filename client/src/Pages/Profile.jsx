import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <section  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-extrabold text-center my-7 rgb(34,34,34)'>Profile</h1>
      <form className='flex flex-col items-center gap-4 bg-[rgb(250,243,225)] p-8 rounded-lg shadow-md max-w-md mx-auto'>
        <img src={currentUser.photo} alt='Profile' className='w-32 h-32 rounded-full object-cover mx-auto cursor-pointer' />
        <input type='text' value={currentUser.username} readOnly className='border border-gray-300 p-2 rounded-lg w-full text-center' id='username' />
        <input type='email' value={currentUser.email} readOnly className='border border-gray-300 p-2 rounded-lg w-full text-center' id='email' />
        <input type='password' placeholder='password' id = 'password' className='border border-gray-300 p-2 rounded-lg w-full text-center' />

        <button className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-3 border rounded-lg w-full hover:opacity-95 disabled:opacity-80'>UPDATE</button>
      </form>
      <div className= "flex justify-between mt-5">
        <span className='text-red-500 cursor-pointer hover:underline '>Delete Account</span>
        <span className='text-red-500 cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </section>
  )
}

export default Profile