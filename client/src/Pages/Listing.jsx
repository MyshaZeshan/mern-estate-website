import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/swiper-bundle.css'

const Listing = () => {
    SwiperCore.use({Navigation})
    const [listing,setlisting] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setloading(true);
                const listingId = params.listingId;
                const res = await fetch (`/api/listing/get/${listingId}`);
                const data = await res.json();
                if(data.success===false){
                    seterror(true);
                    setloading(false);
                    console.log(data.message);
                }
                setlisting(data);
                setloading(false);
                seterror(false);
            } catch (error) {
                seterror(true);
                setloading(false);
            }
            
        }
        fetchListing();
    },[])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>something went wrong!</p>}

        {listing && !loading && !error && <div> 
            <Swiper modules={[Navigation]}
                    navigation
                    allowTouchMove={false}>
                {listing.imageURL.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className='h-[550px]'style={{background: `url(${url})`,   backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize:'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>}
    </main>
  )
}

export default Listing