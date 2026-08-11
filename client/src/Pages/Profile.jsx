import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserStart,updateUserFailure,updateUserSuccess,deleteUserFailure,deleteUserSuccess,deleteUserStart } from '../redux/user/userSlice'



const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser,loading,error} = useSelector((state)=>state.user)
  const [formdata,setformdata] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  
  const handleChange = (e) =>{
      setformdata({
        ...formdata,
        [e.target.id] : e.target.value,
      })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();

      if(data.success===false){
        dispatch(updateUserFailure(data.msg));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
    

  }

  const handleDeleteUser =  async(e) => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE',
      })
      const data =await res.json();
      if(data.success ===  false){
        dispatch(deleteUserFailure(data.msg));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }catch(error)
    {
      dispatch(deleteUserFailure(error.msg))
    }
  }
  return (
    <section  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-extrabold text-center my-7 text-[rgb(34,34,34)]'>Profile</h1>
      <form onSubmit = {handleSubmit} className='flex flex-col items-center gap-4 bg-[rgb(250,243,225)] p-8 rounded-lg shadow-md max-w-md mx-auto'>

        <input type='file' ref={fileRef} className='hidden' accept='image/*'/>
        <img onClick = {()=>fileRef.current.click()} src={currentUser.photo} alt='Profile' className='w-32 h-32 rounded-full object-cover mx-auto cursor-pointer' />
        <input onChange={handleChange} type='text' defaultValue={currentUser.username} placeholder='username' id='username' className='border border-gray-300 p-2 rounded-lg w-full text-center' />
        <input onChange={handleChange} type='email' defaultValue={currentUser.email} placeholder='email' className='border border-gray-300 p-2 rounded-lg w-full text-center' id='email' />
        <input onChange={handleChange} type='password' placeholder='password' id = 'password' className='border border-gray-300 p-2 rounded-lg w-full text-center' />
        <button  disabled={loading} className='text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-3 border rounded-lg w-full hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'UPDATE'}</button>
      </form>
      <div className= "flex justify-between mt-5">
        <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer hover:underline '>Delete Account</span>
        <span className='text-red-500 cursor-pointer hover:underline'>Sign Out</span>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
      <p className='text-green-500'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </section>
  )
}

export default Profile