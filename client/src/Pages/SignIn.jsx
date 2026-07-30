import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"


export const SignIn = () => {
  // store info:name,emaill,password
  const [formdata, setformdata] = useState({})
  const[error,SetError] = useState(null);
  const[loading,serLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange =  (e) =>{
      setformdata({
        ...formdata, // have the copy of previous data (called spread operator)
        [e.target.id]: e.target.value,
      })

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      serLoading(true);
    const res= await fetch('/api/auth/signin',
      {
        method:'POST', //sending data to server
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formdata),
      }
    ); // api is the full path given in viteconfig
    const data = await res.json();
    if(data.success == false)
    {
      SetError(data.msg);
      serLoading(false);
      return;
    }
    serLoading(false);
    SetError(null);
    navigate('/')
    } catch (error) {
      serLoading(false);
      SetError(error.msg);
    }
    
  }
  return (
    <section className='mx-auto p-3 max-w-lg '>
      <h1 className='text-3xl font-bold text-center mt-14 text-amber-500'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1'>

        <label className='font-bold mt-5'>Enter Email</label>
        <input type = "email" placeholder='JohnDoe@gmail.com' className='border p-3 rounded-lg border-gray-400' id='email' onChange={handleChange} />

        <label className='font-bold mt-5'>Enter Password</label>
        <input type = "password" placeholder='Enter Password' className='border p-3 rounded-lg border-gray-400' id='password' onChange={handleChange}/>
        <button  disabled={loading} className="w-full mt-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition uppercase">
          {loading ? 'loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/SignUp"}>
          <span className='text-blue-500'>Sign Up</span>
        </Link>

      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      
    </section>
  )
}
export default SignIn;