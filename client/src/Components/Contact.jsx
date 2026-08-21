import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord,setlandlord] = useState(null);
    const [error,seterror] = useState(false);
    const [message,setmessage] = useState('');


    useEffect(()=>{
        const fetchLandlord = async()=>{
            try {
                const res = await fetch (`/api/user/${listing?.userRef}`);
                const data = await res.json();
                if(data.success===false){
                    seterror(true);
                    setloading(false);
                    console.log(data.message);
                }
                setlandlord(data);
                seterror(false);
            } catch (error) {
                seterror(true);
                console.log(error)
            }
            
        }
        fetchLandlord();
    },[listing?.userRef])

    const onChange = (e)=>{
        setmessage(e.target.value)
    }
  return (
    <>
        {landlord && (
            <div>
                <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                <textarea className='border w-full rounded-lg m-2' name='message' id="message" rows="2" value={message} onChange={onChange}></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name} &body=${message}`} className=' m-2 uppercase text-center text-[rgb(250,243,225)] bg-[rgb(255,109,31)] font-extrabold p-2 m border rounded-lg w-full hover:opacity-95 disabled:opacity-80'>
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}

export default Contact