import React from 'react'
import {Link} from "react-router-dom"

export const SignUp = () => {
  return (
    <section className='mx-auto p-3 max-w-lg '>
      <h1 className='text-3xl font-bold text-center mt-14 text-amber-500'>Sign Up</h1>
      <form className='flex flex-col gap-1'>
        <label className='font-bold mt-5'>Enter Name</label>
        <input type = "text" placeholder='Enter Name' className='border p-3 rounded-lg border-gray-400' id='username'/>

        <label className='font-bold mt-5'>Enter Email</label>
        <input type = "email" placeholder='JohnDoe@gmail.com' className='border p-3 rounded-lg border-gray-400' id='email'/>

        <label className='font-bold mt-5'>Enter Password</label>
        <input type = "password" placeholder='Enter Password' className='border p-3 rounded-lg border-gray-400' id='password'/>
        <button class="w-full mt-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition uppercase">
        Sign In
        </button>

        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={"/SignIn"}>
            <span className='text-blue-500'>Sign in</span>
          </Link>
        </div>
      </form>
      
    </section>
  )
}
export default SignUp;